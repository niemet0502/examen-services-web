import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './HistoricEntity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'serviceswebexam',
      entities: [History],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([History]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
