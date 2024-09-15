import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Offer } from '../modules/offer/offer.entity';
import { Purchase } from '../modules/purchase/purchase.entity';
import * as dotenv from 'dotenv';
import { ScheduledTask } from '../modules/scheduledTask/scheduled-task.entity';

dotenv.config();

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Offer, Purchase, ScheduledTask],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
};

export const dataSource = new DataSource(config);

