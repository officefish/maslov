import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Widget, Prisma } from '@prisma/client'

@Injectable()
export class WidgetService {
  constructor(private prisma: PrismaService) {}

  async widget(where: Prisma.WidgetWhereUniqueInput): Promise<Widget | null> {
    return this.prisma.widget.findUnique({
      where,
    })
  }

  async widgets(params: {
    skip?: number
    take?: number
    cursor?: Prisma.WidgetWhereUniqueInput
    where?: Prisma.WidgetWhereInput
    orderBy?: Prisma.WidgetOrderByWithRelationInput
  }): Promise<Widget[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.widget.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createWidget(data: Prisma.WidgetCreateInput): Promise<Widget> {
    return this.prisma.widget.create({
      data,
    })
  }

  async updateWidget(
    where: Prisma.WidgetWhereUniqueInput,
    data: Prisma.WidgetUpdateInput,
  ): Promise<Widget> {
    return this.prisma.widget.update({
      where,
      data,
    })
  }

  async deleteWidget(where: Prisma.WidgetWhereUniqueInput): Promise<Widget> {
    return this.prisma.widget.delete({
      where,
    })
  }
}
