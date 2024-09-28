import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryUserDTO } from './dtos/query-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string) {
    return this.userRepository.findById(id);
  }

  async getAll(queryUserDTO: QueryUserDTO) {
    const queryUsers: Prisma.UserFindManyArgs = {
      orderBy: {},
      where: {},
    };

    if (queryUserDTO.sort) {
      queryUsers.orderBy = { [queryUserDTO.sort]: 'asc' };
    }

    if (queryUserDTO.filter) {
      queryUsers.where.role = { equals: queryUserDTO.filter };
    }

    if (queryUserDTO.name) {
      queryUsers.where.AND = [
        { firstName: { contains: queryUserDTO.name, mode: 'insensitive' } },
        { lastName: { contains: queryUserDTO.lastName, mode: 'insensitive' } },
      ];
    }

    return this.userRepository.findMany(queryUsers);
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async delete(id: string) {
    return this.userRepository.deleteById(id);
  }

  async updateById(id: string, data) {
    return this.userRepository.updateById(id, data);
  }
}
