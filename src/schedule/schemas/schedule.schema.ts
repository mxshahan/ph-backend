import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export enum Weekday {
  MONDAY = ' MONDAY',
  TUESDAY = ' TUESDAY',
  WEDNESDAY = ' WEDNESDAY',
  THURSDAY = ' THURSDAY',
  FRIDAY = ' FRIDAY',
  SATURDAY = ' SATURDAY',
  SUNDAY = ' SUNDAY',
}

export enum ScheduleType {
  COURSE = 'COURSE',
  JOB = 'JOB',
}

@Schema()
class CourseType extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Schedule extends Document {
  @Prop({ required: true })
  day: Weekday;

  @Prop({ required: true })
  type: ScheduleType;

  @Prop({ default: [] })
  courses: CourseType[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
