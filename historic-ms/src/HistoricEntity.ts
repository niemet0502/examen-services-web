import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  searchDate: string;

  @Column()
  request: string;

  @Column()
  date: string;

  @Column()
  day: string;
}
