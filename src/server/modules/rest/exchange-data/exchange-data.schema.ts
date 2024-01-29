import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

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


export class AlphaVintageMinDto extends createZodDto(AlphaVintageMinSchema) {}
export class AlphaVintageDto extends createZodDto(AlphaVintageSchema) {}
