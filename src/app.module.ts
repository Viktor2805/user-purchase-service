import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './modules/offer/offer.entity';
import { Purchase } from './modules/purchase/purchase.entity';
import { PurchaseController } from './modules/purchase/purchase.controller';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PurchaseService } from './modules/purchase/purchase.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { TaskScheduler } from './modules/scheduledTask/scheduled-task.scheduler';
import { OfferController } from './modules/offer/offer.controller';
import { OfferService } from './modules/offer/offer.service';
import { User } from './modules/user/user.entity';
import { dataSource } from './config/ormconfig';
import { ScheduledTask } from './modules/scheduledTask/scheduled-task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSource.options),
    TypeOrmModule.forFeature([User, Offer, Purchase, ScheduledTask]),
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController, PurchaseController, OfferController],
  providers: [UserService, OfferService, PurchaseService, TaskScheduler],
})

export class AppModule {}
