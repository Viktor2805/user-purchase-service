import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: string = uuidv4(); 

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Offer)
  offer!: Offer;
}
