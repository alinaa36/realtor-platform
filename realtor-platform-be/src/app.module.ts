import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { DatabaseModule } from './database/database.module';
import { RealEstateModule } from './modules/real-estates/real-estate.module';

@Module({
  imports: [DatabaseModule, UserModule, RealEstateModule],
})
export class AppModule {}
