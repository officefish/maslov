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
import { WidgetService } from './widget.service'
import { Widget } from '@prisma/client'

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
  DeleteWidgetDto,
  UpdateWidgetDto,
} from './widget.schema'
import { WorkspaceService } from '../workspace/workspace.service'

@ApiTags('widget')
@Controller('widget')
export class WidgetController {
  constructor(
    private readonly service: WidgetService,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getWidget(
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

    const widget = await this.service.widget({ id })

    if (!widget) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'Widget not found' })
    }

    const payload = {
      api_function: widget.function,
      options: widget.options,
    }

    return reply.code(201).send({
      statusCode: 201,
      payload,
    })
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async createWidget(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: CreateWidgetDto,
  ): Promise<Widget> {
    const { api_function, options, workspaceId } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const workspace = await this.workspaceService.workspace({ id: workspaceId })
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
  @Post('/update')
  async updateWidget(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: UpdateWidgetDto,
  ): Promise<Widget> {
    const { api_function, options, id } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const data = {
      function: api_function,
      options: options,
    }
    const where = { id }
    const widget = await this.service.updateWidget(where, data)

    if (!widget) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with widget update',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Widget success updated',
      id: widget.id,
    })
  }

  @UseGuards(AuthGuard)
  @Post('/delete')
  async removeWidget(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
    @Body() credentials: DeleteWidgetDto,
  ): Promise<Widget> {
    const { id } = credentials

    const userId = request['userId']
    const user = await this.userService.user({ id: userId })

    if (!user) {
      return reply
        .code(401)
        .send({ statusCode: 401, message: 'User not found' })
    }

    const where = { id }
    const widget = await this.service.deleteWidget(where)

    if (!widget) {
      return reply.code(403).send({
        statusCode: 403,
        message: 'Bad request. Database error with widget delete',
      })
    }

    return reply.code(201).send({
      statusCode: 201,
      message: 'Widget success deleted',
    })
  }
}
