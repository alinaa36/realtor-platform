import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RealEstateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.RealEstateCreateInput) {
    return this.prisma.realEstate.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.realEstate.findFirst({ where: { id } });
  }

  async findMany(args?: Prisma.RealEstateFindManyArgs) {
    return this.prisma.realEstate.findMany({ ...args });
  }

  async updateById(id: string, data: Prisma.RealEstateUpdateInput) {
    return this.prisma.realEstate.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: string) {
    return this.prisma.realEstate.delete({
      where: { id },
    });
  }
}
