import { EstateType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRealEstateDTO {
  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  rooms: number;

  @IsNumber()
  @IsOptional()
  square: number;

  @IsNumber()
  @IsOptional()
  floor: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(EstateType)
  @IsOptional()
  estateType: EstateType;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  userId: string;
}
