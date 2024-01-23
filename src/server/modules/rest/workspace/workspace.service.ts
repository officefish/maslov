import { Injectable } from '@nestjs/common'
import { PrismaService } from '@modules/prisma/prisma.service'
import { Workspace, Prisma } from '@prisma/client'

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async workspace(
    where: Prisma.WorkspaceWhereUniqueInput,
  ): Promise<Workspace | null> {
    return this.prisma.workspace.findUnique({
      where,
    })
  }

  async workspaces(params: {
    skip?: number
    take?: number
    cursor?: Prisma.WorkspaceWhereUniqueInput
    where?: Prisma.WorkspaceWhereInput
    orderBy?: Prisma.WorkspaceOrderByWithRelationInput
  }): Promise<Workspace[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.workspace.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createWorkspace(data: Prisma.WorkspaceCreateInput): Promise<Workspace> {
    return this.prisma.workspace.create({
      data,
    })
  }

  async updateWorkspace(params: {
    where: Prisma.WorkspaceWhereUniqueInput
    data: Prisma.WorkspaceUpdateInput
  }): Promise<Workspace> {
    const { data, where } = params
    return this.prisma.workspace.update({
      data,
      where,
    })
  }

  async deleteWorkspace(
    where: Prisma.WorkspaceWhereUniqueInput,
  ): Promise<Workspace> {
    return this.prisma.workspace.delete({
      where,
    })
  }
}
