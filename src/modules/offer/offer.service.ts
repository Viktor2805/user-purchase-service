import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
  ) {}

  async createOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create(createOfferDto);
    const { name } = createOfferDto

    const existingOffer = await this.offerRepository.findOne({ where: { name } });

    if (existingOffer) {
      throw new ConflictException('Name already in use');
    }

    return this.offerRepository.save(offer);    
  }
}
