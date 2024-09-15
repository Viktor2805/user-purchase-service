import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from './task-type.enum';

@Entity('scheduled_tasks')
export class ScheduledTask {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4(); 

  @Column({ type: 'enum', enum: TaskType })
  type!: string;

  @Column({ nullable: true, type: 'jsonb' })  
  payload: any;

  @Column({ type: 'timestamp' })
  scheduledTime!: Date;

  @Column({ default: false })
  isExecuted!: boolean;

  @Column({ nullable: true, type: 'text' }) 
  error?: string | null;
}
