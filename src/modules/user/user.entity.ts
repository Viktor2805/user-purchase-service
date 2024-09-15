import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string = uuidv4(); 

  @Column({ unique: true })
  email!: string;

  @Column('json')
  marketingData!: object;
}
