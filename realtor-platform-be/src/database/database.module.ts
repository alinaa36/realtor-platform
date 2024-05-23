import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from './repositories/user.repository';
import { RealEstateRepository } from './repositories/real-estate.repository';

@Module({
  providers: [PrismaService, UserRepository, RealEstateRepository],
  exports: [PrismaService, UserRepository, RealEstateRepository],
})
export class DatabaseModule {}
