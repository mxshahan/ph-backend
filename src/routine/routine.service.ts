import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class RoutineService {
  generateRoutine(user: User) {
    return {};
  }
}
