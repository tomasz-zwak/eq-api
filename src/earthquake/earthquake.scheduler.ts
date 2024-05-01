import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { EarthquakeService } from 'src/earthquake/earthquake.service';
import { EarthquakeImportAudit } from 'src/earthquake/earthquake-import-audit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EarthquakeScheduler {
  private readonly logger = new Logger(EarthquakeScheduler.name);

  constructor(
    private readonly earthquakeService: EarthquakeService,
    @InjectRepository(EarthquakeImportAudit)
    private readonly earthquakeImportAuditRepository: Repository<EarthquakeImportAudit>,
  ) {}

  @Timeout(5000)
  async synchronizeEarthquakes() {
    const startDate = new Date('2024-03-08');

    this.logger.log('Earthquakes synchronization started');

    await this.earthquakeService.synchronize(startDate);

    this.logger.log('Earthquakes synchronization done');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateEarthquakes() {
    const latestAuditEntry = await this.earthquakeImportAuditRepository.findOne(
      { where: {}, order: { createdAt: 'DESC' } },
    );

    if (!latestAuditEntry) {
      return this.logger.error(
        'Dataset update aborted, run initial synchronization first.',
      );
    }

    await this.earthquakeService.synchronize(latestAuditEntry.createdAt);
  }
}
