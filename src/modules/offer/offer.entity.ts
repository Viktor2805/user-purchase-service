import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: string = uuidv4(); 

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;
}
