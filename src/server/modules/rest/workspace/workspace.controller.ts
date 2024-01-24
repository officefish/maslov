import {
  Controller,
  Get,
  //Param,
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
    return this.service.createWorkspace({
      title,
      user: {
        connect: { id: user.id },
      },
    })
  }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.updatePost({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   })
  // }

  // @Delete('post/:id')
  // async deletePost(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.deletePost({ id: Number(id) })
  // }
}
