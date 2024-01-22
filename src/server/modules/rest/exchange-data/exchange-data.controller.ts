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
import {
  AlphaVintageService,
  IAlphaVintageOptions,
} from './alpha-vintage.service'

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

  @Get('segments')
  async getSegments(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const date = request['dateTime']
    const provider = request['provider']
    const segments = await this.database.segments({
      date,
      provider,
    })
    return segments
      ? reply.code(201).send({ statusCode: 201, segments })
      : reply
          .code(201)
          .send({ statusCode: 201, message: 'No segments found', segments })
  }

  @Get('alpha-vintage/intraday')
  async getAlphaVintageIntraday(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const symbol = request['symbol'] || 'IBM'
    const interval = request['interfal']
    const adjusted = request['adjusted'] || true
    const extended_hours = request['extended_hours'] || true
    const month = request['month'] || '2009-01'
    const outputsize = request['outputsize'] || 'compact'
    const datatype = request['datatype'] || 'json'
    const options = {
      symbol,
      interval,
      adjusted,
      extended_hours,
      month,
      outputsize,
      datatype,
    } satisfies IAlphaVintageOptions
    const response = await this.alphavintage.intraday({ options })
    const data = response.data
    console.log(data)
    return data
      ? reply.code(201).send({ statusCode: 201, data })
      : reply.code(403).send({ statusCode: 401, message: '' })
  }
}
