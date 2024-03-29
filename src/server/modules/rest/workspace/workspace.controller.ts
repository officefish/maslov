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
import {
  CreateWidgetDto,
  CreateWorkspaceDto,
  DeleteWorkspaceDto,
  UpdateWorkspaceDto,
} from './workspace.schema'

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

    const widgets = await this.service.widgets({
      where: { workspaceId: workspace.id },
    })

    const payload = {
      //widgets: workspace.
      date: workspace.updatedAt ?? workspace.createdAt,
      title: workspace.title,
      widgets,
    }

    return reply.code(201).send({
      statusCode: 201,
      payload,
    })
  }

  @UseGuards(AuthGuard)
  @Post('/:id/widget')
  async createWidget(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: CreateWidgetDto,
    @Param('id') id: string,
  ): Promise<Workspace> {
    const { api_function, options } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const workspace = await this.service.workspace({ id })
    if (!workspace) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error. No workspace found.',
      })
    }

    const widget = await this.service.createWidget({
      function: api_function,
      options: options,
      workspace: {
        connect: { id: workspace.id },
      },
    })

    if (!widget) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with widget creation',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Widget creation done',
      id: widget.id,
    })
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async deleteWorkspace(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: DeleteWorkspaceDto,
  ) {
    const { id } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const where = { id }
    const workspace = await this.service.deleteWorkspace(where)

    if (!workspace) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace delete',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Workspace success deleted',
    })
  }

  @UseGuards(AuthGuard)
  @Post('/update')
  async updateWorkspace(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: UpdateWorkspaceDto,
  ) {
    const { id, title } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const where = { id }
    const data = { title }
    const workspace = await this.service.updateWorkspace({ where, data })

    if (!workspace) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with workspace update',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Workspace success updated.',
    })
  }
}
