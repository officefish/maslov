import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { ExchangeSegment, Prisma } from '@prisma/client'

@Injectable()
export class ExchangeDataService {
  constructor(private prisma: PrismaService) {}

  async segments(
    input: Prisma.ExchangeSegmentWhereInput,
  ): Promise<ExchangeSegment[] | null> {
    return this.prisma.exchangeSegment.findMany({ where: input })
  }
}
