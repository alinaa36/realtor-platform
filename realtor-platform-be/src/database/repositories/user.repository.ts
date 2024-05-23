import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findById(id: string) {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async findMany(args?: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany({ ...args });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async deleteById(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
