import { IsOptional } from 'class-validator';
import { EstateType } from '@prisma/client';

export class QueryRealEstateDTO {
  @IsOptional()
  sort?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  rooms?: number;

  @IsOptional()
  square?: number;

  @IsOptional()
  estateType?: EstateType;

  @IsOptional()
  userId?: string;
}
