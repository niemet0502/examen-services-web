import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './HistoricEntity';
import { CreateHistory } from './dto/create-history';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(History)
    private repository: Repository<History>,
  ) {}

  @Post()
  async insert(@Body() body: CreateHistory) {
    return await this.repository.save(body);
  }

  @Get()
  async get() {
    const results = await this.repository.find();
    return results.map((item) => ({
      id: item.id,
      searchDate: item.searchDate,
      searchItems: {
        request: item.request,
        response: {
          date: item.date,
          day: item.day,
        },
      },
    }));
  }
}
