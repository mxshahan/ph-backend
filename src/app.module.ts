import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilModule } from './util/util.module';
import { RoutineModule } from './routine/routine.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    UtilModule,
    RoutineModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
