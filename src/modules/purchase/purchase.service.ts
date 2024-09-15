import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';
import { ConfigService } from '@nestjs/config';
import { TaskScheduler } from '../scheduledTask/scheduled-task.scheduler';
import axios from 'axios';
import { TaskType } from '../scheduledTask/task-type.enum';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Offer) private offerRepository: Repository<Offer>,
    private configService: ConfigService,
    private taskScheduler: TaskScheduler,
  ) {}

  async createPurchase(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { userId, offerId } = createPurchaseDto;
    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    const offer = await this.offerRepository.findOne({ where: { id: offerId } });
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${offerId} not found`);
    }

    const purchase = this.purchaseRepository.create({ user, offer });
    await this.purchaseRepository.save(purchase);

    const analyticsUrl = this.configService.get<string>('ANALYTICS_URL');

    if (!analyticsUrl) {
      throw new Error('Analytics URL is not defined');
    }

    await axios.post(analyticsUrl, { userId, offerId });

    this.taskScheduler.scheduleTask(TaskType.REPORT, { email: "test@gmail.com"}, 24);

    return purchase;
  }
}
