import { IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class QueryUserDTO {
  @IsOptional()
  @IsString()
  filter?: Role;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
