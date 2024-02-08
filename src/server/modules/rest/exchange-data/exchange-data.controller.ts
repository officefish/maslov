import {
  Controller,
  Get,
  //Param,
  Post,
  Body,
  Req,
  Res,
  Query,
  UseGuards,
  //Put,
  //Delete
} from '@nestjs/common'
import { ExchangeDataService } from './exchange-data.service'
//import { ExchangeSegment as SegmentModel } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

import { AuthGuard } from '@modules/rest/auth/auth.guard'

import {
  //ApiCreatedResponse,
  //ApiResponse,
  //ApiBody,
  ApiTags,
} from '@nestjs/swagger'
import {
  AlphaVintageService,
  IAlphaVintageOptions,
  IAlphaVintageMinOptions,
} from './alpha-vintage.service'
import {
  AlphaVintageCoreDto,
  AlphaVintageDto,
  AlphaVintageMinDto,
  CreateManySegmentsDto,
} from './exchange-data.schema'

@Controller('data')
@ApiTags('data')
export class ExchangeDataController {
  constructor(
    private readonly database: ExchangeDataService,
    private readonly alphavintage: AlphaVintageService,
  ) {}

  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.post({ id: Number(id) })
  // }

  @UseGuards(AuthGuard)
  @Get('segment/many')
  async getSegments(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const symbol = request['symbol']
    const provider = request['provider']
    const segments = await this.database.segments({
      symbol,
      provider,
    })
    return segments
      ? reply.code(201).send({ statusCode: 201, segments })
      : reply
          .code(201)
          .send({ statusCode: 201, message: 'No segments found', segments })
  }

  @Post('segment/many')
  async createMany(
    @Body() credentials: CreateManySegmentsDto,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<object> {
    const { segments } = credentials
    console.log(segments)

    return reply.code(201).send({ statusCode: 201, message: 'ok' })
  }

  @Get('alpha-vintage/intraday')
  async getAlphaVintageIntraday(
    // @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() params: AlphaVintageDto,
  ) {
    const symbol = params.symbol || 'IBM'
    const interval = params.interval || '5min'
    const adjusted = params.adjusted || true
    const extended_hours = params.extended_hours || true
    const month = params.month || '2009-01'
    const outputsize = params.outputsize || 'compact'
    const datatype = params.datatype || 'json'
    const options = {
      symbol,
      interval,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    } satisfies IAlphaVintageOptions
    //console.log(options)
    const response = await this.alphavintage.intraday({ options })
    const data = response.data
    //console.log(data)
    return data
      ? reply.code(201).send({ statusCode: 201, data })
      : reply.code(403).send({ statusCode: 401, message: '' })
  }

  @Get('alpha-vintage/daily')
  async getAlphaVintageDaily(
    // @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() params: AlphaVintageMinDto,
  ) {
    const symbol = params.symbol || 'IBM'
    const adjusted = params.adjusted || true
    const extended_hours = params.extended_hours || true
    const month = params.month || '2009-01'
    const outputsize = params.outputsize || 'compact'
    const datatype = params.datatype || 'json'
    const options = {
      symbol,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    } satisfies IAlphaVintageMinOptions
    //console.log(options)
    const response = await this.alphavintage.daily({
      options: { symbol: options.symbol },
    })
    const data = response.data
    //console.log(data)
    return data
      ? reply.code(201).send({ statusCode: 201, data })
      : reply.code(403).send({ statusCode: 401, message: '' })
  }

  @Get('alpha-vintage/core')
  async getAlphaVintageCore(
    // @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() params: AlphaVintageCoreDto,
  ) {
    const symbol = params.symbol || 'IBM'
    const api_function = params.api_function || 'DAILY'
    const adjusted = params.adjusted || true
    const extended_hours = params.extended_hours || true
    const month = params.month || '2009-01'
    const outputsize = params.outputsize || 'compact'
    const datatype = params.datatype || 'json'
    const options = {
      symbol,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    } satisfies IAlphaVintageMinOptions
    //console.log(options)
    let response
    switch (api_function.toLowerCase()) {
      case 'daily':
        response = await this.alphavintage.daily({
          options: { symbol: options.symbol },
        })
        break
      case 'weekly':
        response = await this.alphavintage.weekly({
          options: { symbol: options.symbol },
        })
        break
      case 'monthly':
        response = await this.alphavintage.monthly({
          options: { symbol: options.symbol },
        })
        break
      default:
        response = await this.alphavintage.monthly({
          options: { symbol: options.symbol },
        })
        break
    }

    const data = response.data
    if (!data) {
      return reply
        .code(403)
        .send({ statusCode: 403, message: 'No response data found' })
    }

    /* Probabiy bad symbol or some another error */
    if (data['Error Message']) {
      reply.code(403).send({
        statusCode: 403,
        message: 'Invalid Alpha Vintage Api call. Probably wrong symbol.',
        data,
      })
    }

    /* Api limits catched */
    if (data['Information']) {
      reply.code(403).send({
        statusCode: 403,
        message: 'Alpha Vintage API Limits enabled. Wait next day.',
        data,
      })
    }

    return reply.code(201).send({ statusCode: 201, data })
  }

  @Get('alpha-vintage/core/fake')
  async getAlphaVintageCoreFake(
    // @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Query() params: AlphaVintageCoreDto,
  ) {
    const api_function = params.api_function || 'DAILY'

    let response
    switch (api_function.toLowerCase()) {
      case 'daily':
        response = await this.alphavintage.fakeDaily()
        break
      case 'weekly':
        response = await this.alphavintage.fakeWeekly()
        break
      case 'monthly':
        response = await this.alphavintage.fakeMonthly()
        break
      default:
        response = await this.alphavintage.fakeDaily()
        break
    }

    const data = response.data
    return data
      ? reply.code(201).send({ statusCode: 201, data })
      : reply.code(403).send({ statusCode: 401, message: '' })
  }

  @Get('alpha-vintage/core/invalid')
  async getAlphaVintageCoreInvalid(@Res() reply: FastifyReply) {
    const data = this.alphavintage.invalidCall()
    reply.code(403).send({
      statusCode: 403,
      message: 'Invalid Alpha Vintage Api call. Probably wrong symbol.',
      data,
    })
  }

  @Get('alpha-vintage/core/limit')
  async getAlphaVintageCoreLimit(@Res() reply: FastifyReply) {
    const data = this.alphavintage.invalidCall()
    reply.code(403).send({
      statusCode: 403,
      message: 'Alpha Vintage API Limits enabled. Wait next day.',
      data,
    })
  }
}
