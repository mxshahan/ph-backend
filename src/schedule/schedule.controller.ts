import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() payload: CreateScheduleDto, @CurrentUser() user: User) {
    return this.scheduleService.create(payload, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  get(@CurrentUser() user: User, @Query() query) {
    return this.scheduleService.getSchedules(user, query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@CurrentUser() user: User, @Param('id') id: string) {
    return this.scheduleService.delete(user, id);
  }
}
