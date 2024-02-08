import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

import { Provider } from '@prisma/client'
const providerEnum = z.nativeEnum(Provider)

//const datatypes = ['json', 'scv']

enum IntervalMinutes {
  One = '1min',
  Five = '5min',
  Fifteen = '15min',
  Thirty = '30min',
  Sixty = '60min',
}

enum OutputSize {
  Compact = 'compact',
  Full = 'full',
}

enum Datatype {
  JSON = 'json',
  SCV = 'scv',
}

const AlphaVintageMinSchema = z.object({
  symbol: z.string(),
  adjusted: z.boolean().optional(),
  extended_hours: z.boolean().optional(),
  month: z.string().optional(),
  outputsize: z.nativeEnum(OutputSize).optional(),
  datatype: z.nativeEnum(Datatype).optional(),
})

const AlphaVintageSchema = z.object({
  symbol: z.string(),
  interval: z.nativeEnum(IntervalMinutes),
  adjusted: z.boolean().optional(),
  extended_hours: z.boolean().optional(),
  month: z.string().optional(),
  outputsize: z.nativeEnum(OutputSize).optional(),
  datatype: z.nativeEnum(Datatype).optional(),
})

const AlphaVintageCoreSchema = z.object({
  symbol: z.string(),
  api_function: z.string(),
  interval: z.nativeEnum(IntervalMinutes).optional(),
  adjusted: z.boolean().optional(),
  extended_hours: z.boolean().optional(),
  month: z.string().optional(),
  outputsize: z.nativeEnum(OutputSize).optional(),
  datatype: z.nativeEnum(Datatype).optional(),
})

const SegmentSchema = z.object({
  provider: providerEnum,
  symbol: z.string(),
  high: z.number(),
  low: z.number(),
  open: z.number(),
  close: z.number(),
  date: z.string().datetime(),
})

const SegmentListSchema = z.object({
  segments: z.array(SegmentSchema),
})

export class AlphaVintageMinDto extends createZodDto(AlphaVintageMinSchema) {}
export class AlphaVintageDto extends createZodDto(AlphaVintageSchema) {}
export class AlphaVintageCoreDto extends createZodDto(AlphaVintageCoreSchema) {}

export class CreateManySegmentsDto extends createZodDto(SegmentListSchema) {}
