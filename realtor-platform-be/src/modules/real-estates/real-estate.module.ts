import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RealEstateService } from './real-estate.service';
import { RealEstateController } from './real-estate.controller';
import { RealEstateByIdPipe } from 'src/pipes/real-estate-by-id.pipe';

@Module({
  controllers: [RealEstateController],
  providers: [RealEstateService, RealEstateByIdPipe],
  imports: [DatabaseModule],
})
export class RealEstateModule {}
