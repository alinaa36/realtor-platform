import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { RealEstateRepository } from 'src/database/repositories/real-estate.repository';

@Injectable()
export class RealEstateByIdPipe implements PipeTransform {
  constructor(private readonly realEstateRepository: RealEstateRepository) {}

  async transform(id: string): Promise<string> {
    const realEstate = await this.realEstateRepository.findById(id);

    if (!realEstate) {
      throw new NotFoundException('User with such id is not found');
    }

    return id;
  }
}
