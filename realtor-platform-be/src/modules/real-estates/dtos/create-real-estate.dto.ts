import { EstateType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRealEstateDTO {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  rooms: number;

  @IsNumber()
  @IsNotEmpty()
  square: number;

  @IsNumber()
  @IsNotEmpty()
  floor: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEnum(EstateType)
  @IsNotEmpty()
  estateType: EstateType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
