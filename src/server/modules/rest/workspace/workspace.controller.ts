import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  //Put,
  //Delete
} from '@nestjs/common'
import { WorkspaceService } from './workspace.service'
import { Workspace } from '@prisma/client'

import {
  //ApiCreatedResponse,
  //ApiResponse,
  //ApiBody,
  ApiTags,
} from '@nestjs/swagger'

import { AuthGuard } from '../auth/auth.guard'

import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../user/user.service'
import { CreateWorkspaceDto } from './workspace.schema'

@ApiTags('workspace')
@Controller('workspace')
export class WorkspaceController {
  constructor(
    private readonly service: WorkspaceService,
    private readonly userService: UserService,
  ) {}

  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.post({ id: Number(id) })
  // }

  @UseGuards(AuthGuard)
  @Get('/')
  async getUserWorkspaces(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<Workspace[]> {
    // because of AuthGuard we have userId in FastifyRequest
    const id = request['userId']
    const user = await this.userService.user({ id })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }
    const workspaces = await this.service.workspaces({
      where: { userId: user.id },
    })

    return reply.code(201).send({ statusCode: 201, workspaces })
  }

  //   @Get('filtered-posts/:searchString')
  //   async getFilteredPosts(
  //     @Param('searchString') searchString: string,
  //   ): Promise<Workspace[]> {
  //     return this.service.workspaces({
  //       where: {
  //         OR: [
  //           {
  //             title: { contains: searchString },
  //           },
  //           {
  //             content: { contains: searchString },
  //           },
  //         ],
  //       },
  //     })
  //   }
  @UseGuards(AuthGuard)
  @Post('/')
  async createWorkspace(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const { title } = credentials
    const id = request['userId']
    const user = await this.userService.user({ id })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }
    const workspace = await this.service.createWorkspace({
      title,
      user: {
        connect: { id: user.id },
      },
    })

    if (!workspace) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace creation',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Creation done',
      id: workspace.id,
    })
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getWorkspace(
    @Res() reply: FastifyReply,
    @Req() request: FastifyRequest,
    @Param('id') id: string,
    //@Body() credentials: GetWorkspaceDto,
  ) {
    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    // workspace id
    const workspace = await this.service.workspace({ id })
    if (!workspace) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace',
      })
    }

    const payload = {
      //widgets: workspace.
      date: workspace.updatedAt ?? workspace.createdAt,
      title: workspace.title,
    }

    return reply.code(201).send({
      statusCode: 201,
      payload,
    })
  }

  // @Delete('post/:id')
  // async deletePost(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.deletePost({ id: Number(id) })
  // }
}
