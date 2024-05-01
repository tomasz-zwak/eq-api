import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EarthquakeApiClient } from 'src/earthquake/client/api';
import {
  Earthquake,
  EarthquakeFiltersInput,
  Earthquakes,
} from 'src/earthquake/earthquake.entity';
import { EarthquakeImportAudit } from 'src/earthquake/earthquake-import-audit.entity';
import { Pagination } from 'src/utils/pagination.gql-type';
import { Repository } from 'typeorm';

@Injectable()
export class EarthquakeService {
  private readonly logger = new Logger(EarthquakeService.name);

  constructor(
    @InjectRepository(Earthquake)
    private readonly earthquakeRepository: Repository<Earthquake>,
    @InjectRepository(EarthquakeImportAudit)
    private readonly earthquakeImportAuditRepository: Repository<EarthquakeImportAudit>,
  ) {}

  async getEarthquakes(
    pagination: Pagination,
    { date, state, country }: EarthquakeFiltersInput,
  ): Promise<Earthquakes> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log(
      startOfDay,
      endOfDay,
      pagination.perPage,
      (pagination.page - 1) * pagination.perPage,
    );

    const earthquakesQuery = this.earthquakeRepository
      .createQueryBuilder('earthquake')
      .where('earthquake.time BETWEEN :startDate AND :endDate', {
        startDate: startOfDay,
        endDate: endOfDay,
      })
      .take(pagination.perPage)
      .skip((pagination.page - 1) * pagination.perPage);

    if (state) {
      earthquakesQuery.andWhere('earthquake.state LIKE :state', {
        state: `%${state.toLowerCase()}%`,
      });
    }

    if (country) {
      earthquakesQuery.andWhere('earthquake.country LIKE :country', {
        state: `%${country.toLowerCase()}%`,
      });
    }

    console.log(earthquakesQuery.getSql(), earthquakesQuery.getParameters());

    const [entries, count] = await earthquakesQuery.getManyAndCount();

    return { entries, total: count };
  }

  async synchronize(startDate: Date) {
    const date = new Date(startDate);
    date.setHours(0, 0, 0, 0);

    const perPage = 10000;
    let page = 1;
    let offset = 1;
    let fetchMore = true;

    let successCount = 0;
    let errorCount = 0;

    const errors: string[] = [];

    this.earthquakeRepository.queryRunner;

    while (fetchMore) {
      const { data, error } = await EarthquakeApiClient.GET('/query', {
        params: {
          query: {
            format: 'geojson',
            starttime: date.toISOString(),
            orderby: 'time',
            limit: perPage,
            offset,
          },
        },
      });

      if (error) errors.push(JSON.stringify(error));

      offset = page * perPage + 1;
      page += 1;

      fetchMore = data?.features.length === perPage;

      for (const earthquakeEntry of data?.features || []) {
        const earthquake = this.earthquakeRepository.create({
          ...earthquakeEntry.properties,
          externalId: earthquakeEntry.id,
          geometry: earthquakeEntry.geometry,
          country: faker.location.country(),
          state: faker.location.state(),
        });

        try {
          await this.earthquakeRepository.insert(earthquake);

          successCount += 1;
        } catch (error) {
          const stringifiedError = JSON.stringify(error, (key, value) =>
            ['query', 'parameters'].includes(key) ? '<trimmed>' : value,
          );

          if (!stringifiedError.includes(`"code":"23505"`)) {
            errors.push(
              `Failed to synchronize earthquake entry of ID: ${earthquakeEntry.id}, Error: ${stringifiedError}`,
            );
            this.logger.error(
              `Failed to synchronize earthquake entry of ID: ${earthquakeEntry.id}, Error: ${stringifiedError}`,
            );
            errorCount += 1;
          }
        }
      }
    }

    this.logger.log(
      `Synchronized ${successCount} new entries. ${errorCount} errors. Review EarthquakeImportAudit table for details.`,
    );

    await this.earthquakeImportAuditRepository.save({
      info: { successCount, errorCount, errors },
    });
  }
}
