import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  //Put,
  //Delete
} from '@nestjs/common'
import { PostService } from './post.service'
import { Post as PostModel } from '@prisma/client'

@Controller()
export class PostController {
  constructor(private readonly service: PostService) {}

  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.post({ id: Number(id) })
  // }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.service.posts({
      where: { published: true },
    })
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.service.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData
    return this.service.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
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
