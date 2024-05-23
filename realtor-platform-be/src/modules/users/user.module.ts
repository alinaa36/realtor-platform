import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserByIdPipe } from 'src/pipes/user-by-id.pipe';

@Module({
  controllers: [UserController],
  providers: [UserService, UserByIdPipe],
  imports: [DatabaseModule],
})
export class UserModule {}
