import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Weekday } from '../schemas/schedule.schema';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsEnum(Weekday)
  @IsNotEmpty()
  day: Weekday;

  courses: CourseDto[];
}

class CourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}
