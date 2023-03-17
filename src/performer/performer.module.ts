/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerformerEntity])],
  providers: [PerformerService]
})
export class PerformerModule {}