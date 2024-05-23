import { IsOptional, IsString } from 'class-validator';

export class QueryUserDTO {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  sort?: string;
}
