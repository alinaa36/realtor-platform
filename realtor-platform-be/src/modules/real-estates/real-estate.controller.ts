import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDTO } from './dtos/create-real-estate.dto';
import { RealEstateByIdPipe } from 'src/pipes/real-estate-by-id.pipe';
import { QueryRealEstateDTO } from './dtos/query-real-state.dto';

@Controller('realestate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  async create(@Body() createRealEstateDto: CreateRealEstateDTO) {
    return await this.realEstateService.create(createRealEstateDto);
  }

  @Get(':id')
  async getById(@Param('id', RealEstateByIdPipe) id: string) {
    return await this.realEstateService.getById(id);
  }

  @Get()
  async getAll(@Query() queryRealEstateDTO: QueryRealEstateDTO) {
    return await this.realEstateService.getAll(queryRealEstateDTO);
  }

  @Patch(':id')
  async updateById(
    @Param('id', RealEstateByIdPipe) id: string,
    @Body() CreateRealEstateDto: CreateRealEstateDTO,
  ) {
    return await this.realEstateService.updateById(id, CreateRealEstateDto);
  }

  @Delete(':id')
  async delete(@Param('id', RealEstateByIdPipe) id: string) {
    return await this.realEstateService.delete(id);
  }
}
