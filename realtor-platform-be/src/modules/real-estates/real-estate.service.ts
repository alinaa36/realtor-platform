import { Injectable, NotFoundException } from '@nestjs/common';
import { RealEstateRepository } from 'src/database/repositories/real-estate.repository';
import { QueryRealEstateDTO } from './dtos/query-real-state.dto';
import { Prisma } from '@prisma/client';
import { CreateRealEstateDTO } from './dtos/create-real-estate.dto';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class RealEstateService {
  constructor(
    private readonly realEstateRepository: RealEstateRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateRealEstateDTO) {
    const userId = data.userId;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User with such id is not found');

    delete data.userId;

    return this.realEstateRepository.create({
      ...data,
      user: {
        connect: { id: userId },
      },
    });
  }

  async getById(id: string) {
    return this.realEstateRepository.findById(id);
  }

  async getAll(queryRealEstateDTO: QueryRealEstateDTO) {
    const queryOptions: Prisma.RealEstateFindManyArgs = {};

    if (queryRealEstateDTO.sort) {
      queryOptions.orderBy = {
        [queryRealEstateDTO.sort]: 'asc',
      };
    }

    queryOptions.where = {
      price: queryRealEstateDTO.price ? { lte: queryRealEstateDTO.price } : {},
      rooms: queryRealEstateDTO.rooms
        ? { equals: queryRealEstateDTO.rooms }
        : {},
      square: queryRealEstateDTO.square
        ? { lte: queryRealEstateDTO.square }
        : {},
      estateType: queryRealEstateDTO.type
        ? { equals: queryRealEstateDTO.type }
        : {},
      userId: queryRealEstateDTO.userId
        ? { equals: queryRealEstateDTO.userId }
        : undefined,
    };

    // if (queryRealEstateDTO.filter) {
    //   if (
    //     queryRealEstateDTO.filter === EstateType.PRIVATE ||
    //     queryRealEstateDTO.filter === EstateType.PUBLIC
    //   ) {
    //     queryOptions.where = {
    //       estateType: {
    //         equals: queryRealEstateDTO.filter,
    //       },
    //     };
    //   }
    // }

    // if (queryRealEstateDTO.filterBy) {
    //   queryOptions.where.price = {
    //     lt: +queryRealEstateDTO.filterBy,
    //   };
    // }

    // if (queryRealEstateDTO.filterById) {
    //   queryOptions.where.userId = {
    //     equals: queryRealEstateDTO.filterById,
    //   };
    // }

    return this.realEstateRepository.findMany(queryOptions);
  }

  async updateById(id: string, data) {
    return this.realEstateRepository.updateById(id, data);
  }

  async delete(id: string) {
    return this.realEstateRepository.deleteById(id);
  }
}
