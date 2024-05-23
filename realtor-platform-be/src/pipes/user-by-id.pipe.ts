import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(id: string): Promise<string> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User with such id is not found');
    }

    return id;
  }
}
