import {
  Controller,
  Get,
  //Param,
  //Post,
  //Body,
  Req,
  Res,
  //Put,
  //Delete
} from '@nestjs/common'
import { ExchangeDataService } from './exchange-data.service'
//import { ExchangeSegment as SegmentModel } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

import {
  //ApiCreatedResponse,
  //ApiResponse,
  //ApiBody,
  ApiTags,
} from '@nestjs/swagger'

@Controller('data')
@ApiTags('data')
export class ExchangeDataController {
  constructor(private readonly service: ExchangeDataService) {}

  // @Get('post/:id')
  // async getPostById(@Param('id') id: string): Promise<PostModel> {
  //   return this.service.post({ id: Number(id) })
  // }

  @Get('segments')
  async getSegments(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const date = request['dateTime']
    const provider = request['provider']
    const segments = await this.service.segments({
      date,
      provider,
    })
    return segments
      ? reply.code(201).send({ statusCode: 201, segments })
      : reply
          .code(201)
          .send({ statusCode: 201, message: 'No segments found', segments })
  }
}
