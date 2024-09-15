import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { ScheduledTask } from './scheduled-task.entity';
import axios from 'axios';
import { TaskType } from './task-type.enum';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskScheduler {
  constructor(
    @InjectRepository(ScheduledTask)
    private readonly scheduledTaskRepository: Repository<ScheduledTask>,
    private configService: ConfigService,
  ) {}

  async scheduleTask(type: TaskType.REPORT, payload: any, delayInHours: number) {
    const scheduledTime = new Date();
    scheduledTime.setHours(scheduledTime.getHours() + delayInHours);

    const newTask = this.scheduledTaskRepository.create({
      payload,
      scheduledTime,
      isExecuted: false,
      type,
    });

    await this.scheduledTaskRepository.save(newTask);
  }

  @Cron('*/1 * * * *') // Runs every minute
  async processTasks() {
    const tasks = await this.scheduledTaskRepository.find({
      where: {
        scheduledTime: LessThanOrEqual(new Date()),
        isExecuted: false,
      },
    });

    for (const task of tasks) {
      try {
        await this.handleTask(task);
        task.isExecuted = true; 
        task.error = null;
      } catch (err) {
        task.isExecuted = true
        if (err instanceof Error) {
          task.error = JSON.stringify({
            message: err.message,
            stack: err.stack,
          });
        } else {
          task.error = JSON.stringify({ error: err });
        }
      } finally {
        await this.scheduledTaskRepository.save(task); 
      }
    }
  }

  private async handleTask(task: ScheduledTask) {
    switch (task.type) {
      case TaskType.REPORT:
        if (task.payload) {
          await this.sendAstrologicalReport(task.payload);
        }
        break;
      default:
        console.warn(`Unknown task type: ${task.type}`);
    }
  }

  private async sendAstrologicalReport(payload: any) {
    const astrologyUrl = this.configService.get<string>('ASTROLOGY_URL');

    if (!astrologyUrl) {
      throw new Error('Astrology URL is not defined');
    }

    await axios.post(astrologyUrl, payload);
  }

}
