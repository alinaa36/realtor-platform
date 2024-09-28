import { Injectable, NotFoundException } from '@nestjs/common';
import { RealEstateRepository } from 'src/database/repositories/real-estate.repository';
import { QueryRealEstateDTO } from './dtos/query-real-state.dto';
import { Prisma } from '@prisma/client';
import { CreateRealEstateDTO } from './dtos/create-real-estate.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UpdateRealEstateDTO } from './dtos/update-real-estate.dto';

@Injectable()
export class RealEstateService {
  constructor(
    private readonly realEstateRepository: RealEstateRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(data: CreateRealEstateDTO, imagePath: string) {
    const userId = data.userId;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundException('User with such id is not found');

    delete data.userId;

    const image = 'http://localhost:3001/' + imagePath.replace(/\\/g, '/');

    const createdRealEstate = await this.realEstateRepository.create({
      ...data,
      photo: image,
      user: {
        connect: { id: userId },
      },
    });

    console.log(createdRealEstate.photo);

    return createdRealEstate;
  }

  async getById(id: string) {
    const realEstate = await this.realEstateRepository.findById(id);
    if (!realEstate) {
      throw new NotFoundException('Real estate not found');
    }
    return realEstate;
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
      estateType: queryRealEstateDTO.estateType
        ? { equals: queryRealEstateDTO.estateType }
        : {},
      userId: queryRealEstateDTO.userId
        ? { equals: queryRealEstateDTO.userId }
        : undefined,
    };

    return this.realEstateRepository.findMany(queryOptions);
  }

  async updateById(id: string, data: UpdateRealEstateDTO, imagePath?: string) {
    const userId = data.userId;

    // Якщо imagePath не вказано, не додаємо поле photo до updateData
    const updateData: any = {
      ...data,
      user: userId ? { connect: { id: userId } } : undefined,
    };

    if (imagePath) {
      const image = 'http://localhost:3001/' + imagePath.replace(/\\/g, '/');
      updateData.photo = image;
    }

    delete updateData.userId;

    const updatedRealEstate = await this.realEstateRepository.updateById(
      id,
      updateData,
    );

    console.log(updatedRealEstate.photo);

    return updatedRealEstate;
  }

  async delete(id: string) {
    return this.realEstateRepository.deleteById(id);
  }
}
