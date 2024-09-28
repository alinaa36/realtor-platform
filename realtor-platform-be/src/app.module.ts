import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { DatabaseModule } from './database/database.module';
import { RealEstateModule } from './modules/real-estates/real-estate.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RealEstateModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..'),
    }),
  ],
})
export class AppModule {}
