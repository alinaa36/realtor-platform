import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { Prisma } from '@prisma/client';
import { QueryUserDTO } from './dtos/query-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getById(id: string) {
    return this.userRepository.findById(id);
  }

  async getAll(queryUserDTO: QueryUserDTO) {
    const queryUsers: Prisma.UserFindManyArgs = {};

    if (queryUserDTO.sort) {
      queryUsers.orderBy[queryUserDTO.sort] = 'asc';
    }

    if (queryUserDTO.filter) {
      queryUsers.where.role['equals'] = queryUserDTO.filter;
    }

    return this.userRepository.findMany(queryUsers);
  }

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async delete(id: string) {
    return this.userRepository.deleteById(id);
  }

  // add type for data, use PartialType to implement, see Nest docs
  async updateById(id: string, data) {
    return this.userRepository.updateById(id, data);
  }
}
