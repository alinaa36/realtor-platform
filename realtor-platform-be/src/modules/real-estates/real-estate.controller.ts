import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDTO } from './dtos/create-real-estate.dto';
import { RealEstateByIdPipe } from 'src/pipes/real-estate-by-id.pipe';
import { QueryRealEstateDTO } from './dtos/query-real-state.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateRealEstateDTO } from './dtos/update-real-estate.dto';

@Controller('realestate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createRealEstateDto: CreateRealEstateDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.realEstateService.create(createRealEstateDto, file.path);
  }

  @Get(':id')
  async getById(@Param('id', RealEstateByIdPipe) id: string) {
    const realEstate = await this.realEstateService.getById(id);

    if (!realEstate) {
      throw new NotFoundException('Real estate not found');
    }

    return realEstate;
  }

  @Get()
  async getAll(@Query() queryRealEstateDTO: QueryRealEstateDTO) {
    return await this.realEstateService.getAll(queryRealEstateDTO);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async updateById(
    @Param('id', RealEstateByIdPipe) id: string,
    @Body() updateRealEstateDto: UpdateRealEstateDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.realEstateService.updateById(
      id,
      updateRealEstateDto,
      file ? file.path : null,
    );
  }

  @Delete(':id')
  async delete(@Param('id', RealEstateByIdPipe) id: string) {
    return await this.realEstateService.delete(id);
  }
}

