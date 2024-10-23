import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarthquakeController } from 'src/earthquake/earthquake.controller';
import { Earthquake } from 'src/earthquake/earthquake.entity';
import { EarthquakeResolver } from 'src/earthquake/earthquake.resolver';
import { EarthquakeScheduler } from 'src/earthquake/earthquake.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Earthquake])],
  providers: [EarthquakeResolver, EarthquakeScheduler],
  controllers: [EarthquakeController],
})
export class EarthquakeModule {}
