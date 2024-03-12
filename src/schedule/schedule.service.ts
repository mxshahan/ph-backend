import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleType } from './schemas/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name)
    private readonly model: Model<Schedule>,
  ) {}

  async create(payload: CreateScheduleDto, user: User) {
    const isExists = await this.model.findOne({
      user: user.id,
      day: payload.day,
      type: payload.type,
    });

    if (isExists) {
      throw new UnprocessableEntityException(
        "This day's schedule already exists",
      );
    }

    return this.model.create({ user: user.id, ...payload });
  }

  async getSchedules(user: User, query: { type: ScheduleType }) {
    const where: any = { user: user.id };
    if (query.type) where.type = query.type;

    return this.model.find(where);
  }

  async delete(user: User, id: string) {
    return this.model.deleteOne({ user: user.id, id: id });
  }
}
