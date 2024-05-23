import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserByIdPipe } from 'src/pipes/user-by-id.pipe';
import { QueryUserDTO } from './dtos/query-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', UserByIdPipe) id: string) {
    return await this.userService.delete(id);
  }

  @Get(':id')
  async getById(@Param('id', UserByIdPipe) id: string) {
    return await this.userService.getById(id);
  }

  @Get()
  async getAll(@Query() queryUserDTO: QueryUserDTO) {
    return await this.userService.getAll(queryUserDTO);
  }

  @Patch(':id')
  async updateById(
    @Param('id', UserByIdPipe) id: string,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    return this.userService.updateById(id, CreateUserDto);
  }
}
