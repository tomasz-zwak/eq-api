import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Earthquake } from 'src/earthquake/earthquake.entity';
import { EarthquakeResolver } from 'src/earthquake/earthquake.resolver';
import { EarthquakeScheduler } from 'src/earthquake/earthquake.scheduler';
import { EarthquakeService } from 'src/earthquake/earthquake.service';
import { EarthquakeImportAudit } from 'src/earthquake/earthquake-import-audit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Earthquake, EarthquakeImportAudit])],
  providers: [EarthquakeService, EarthquakeResolver, EarthquakeScheduler],
})
export class EarthquakeModule {}
