import {
  Controller,
  Get,
  //Param,
  //Post,
  //Body,
  Req,
  Res,
  Query,
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
  IAlphaVintageMinOptions,
} from './alpha-vintage.service'
import { AlphaVintageDto, AlphaVintageMinDto } from './exchange-data.schema'

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
    const response = await this.alphavintage.intraday({ options: { symbol: options.symbol} })
    const data = response.data
    //console.log(data)
    return data
      ? reply.code(201).send({ statusCode: 201, data })
      : reply.code(403).send({ statusCode: 401, message: '' })
  }
}
