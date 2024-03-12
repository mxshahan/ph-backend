import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoutineService } from './routine.service';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('routine')
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getRoutine(@CurrentUser() user: User) {
    return this.routineService.generateRoutine(user);
  }
}
