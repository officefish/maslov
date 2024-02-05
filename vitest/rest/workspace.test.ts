import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@modules/app/app.module'
import { ConfigModule } from '@nestjs/config'
//import { Prisma } from '@prisma/client'
//import { PrismaModule } from '@/modules/prisma/prisma.module'

//import { User } from '@prisma/client'
import { PrismaService } from '@modules/prisma/prisma.service'
import { UserService } from '@modules/rest/user/user.service'
import { CryptoService } from '@modules/crypto/crypto.service'
import { AppConfigService } from '@modules/config/config.service'
import { JwtService } from '@nestjs/jwt'

import {
  describe,
  test,
  //it,
  beforeAll,
  afterAll,
  expect,
  expectTypeOf,
} from 'vitest'

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import {
  generateNewUser,
  checkUserNotExist,
  makeUserInputData,
  destroyUser,
} from './user.generator'

const jsonType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

describe('Workspace Service', () => {
  let app: INestApplication
  let userService: UserService
  let prisma: PrismaService
  let env: AppConfigService
  let crypto: CryptoService

  //let userData: FakeNewUser
  //let user: User
  //let prismaUser: User

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule],
      providers: [
        PrismaService,
        UserService,
        CryptoService,
        AppConfigService,
        JwtService,
      ],
    }).compile()

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )
    app.setGlobalPrefix(API_PREFIX)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()

    prisma = await moduleFixture.get<PrismaService>(PrismaService)
    env = await moduleFixture.get<AppConfigService>(AppConfigService)
    crypto = await moduleFixture.get<CryptoService>(CryptoService)
    userService = await moduleFixture.get<UserService>(UserService)
  })

  test('Fail get user workspaces without JWT token', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)
    expect(user).instanceOf(Object)

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/workspace`)

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json['statusCode'] == 401).toBe(true)
    expect(json['message'] == 'Unauthorized').toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (GET) workspaces list for authorized user', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/workspace`)
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    expect(json).haveOwnProperty('workspaces')
    const workspaces = json?.workspaces
    expectTypeOf(workspaces).toBeArray()

    await destroyUser(userService, prisma, userData.email)
  })

  test('Fail (POST) create new workspaces without JWT token', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const userDataForDb = await makeUserInputData({ env, crypto, userData })
    const user = await userService.createUser(userDataForDb)
    expect(user).instanceOf(Object)

    const title = 'IBM daily'

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace`)
      .payload({ title })

    expect(response.statusCode).toBe(401)
    expect(response.headers['content-type']).toBe(jsonType)
    const json = response.json()
    expect(json).haveOwnProperty('statusCode')
    expect(json).haveOwnProperty('message')
    expect(json['statusCode'] == 401).toBe(true)
    expect(json['message'] == 'Unauthorized').toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (POST) new workspace for authorized user', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const title = 'IBM daily'

    const response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace`)
      .payload({ title })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (GET) exist workspace by id', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const title = 'IBM daily'

    let response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace`)
      .payload({ title })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('id')

    const id = json.id
    response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .get(`${API_PREFIX}/workspace/${id}`)
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('payload')
    const payload = json.payload
    expectTypeOf(payload).toBeObject()
    expect(payload).haveOwnProperty('title')
    expect(payload).haveOwnProperty('date')
    expect(payload.title === title).toBe(true)

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (POST) delete workspace by id', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const title = 'IBM daily'

    let response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace`)
      .payload({ title })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('id')

    const id = json.id

    const workspaceData = {
      id,
    }

    response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace/delete`)
      .payload(workspaceData)
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('message')

    await destroyUser(userService, prisma, userData.email)
  })

  test('Success (POST) update workspace', async () => {
    const userData = generateNewUser()

    /* Sure user not exist in db */
    await checkUserNotExist(prisma, userData.email)

    const registerResponse = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/auth/sign-up`)
      .payload(userData)

    expect(registerResponse.statusCode).toBe(201)
    expect(registerResponse.headers['content-type']).toBe(jsonType)
    let json = registerResponse.json()
    expect(json).haveOwnProperty('payload')
    expect(json.payload).haveOwnProperty('accessToken')

    const token = json?.payload?.accessToken || undefined
    expect(token).toBeDefined()

    const title = 'IBM daily'

    let response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace`)
      .payload({ title })
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('id')

    const id = json.id

    const workspaceData = {
      id,
      title: 'IBM daily 2',
    }

    response = await app
      .getHttpAdapter()
      .getInstance()
      .inject()
      .post(`${API_PREFIX}/workspace/update`)
      .payload(workspaceData)
      .headers({ authorization: `Bearer ${token}` })

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(jsonType)
    json = response.json()
    expectTypeOf(json).toBeObject()
    expect(json).haveOwnProperty('statusCode')
    expect(json.statusCode).toBe(201)
    expect(json).haveOwnProperty('message')

    await destroyUser(userService, prisma, userData.email)
  })

  afterAll(async () => {
    await app.getHttpServer().close()
  })
})
