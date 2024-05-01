import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Earthquake,
  EarthquakeFiltersInput,
  EarthquakeInput,
  Earthquakes,
} from 'src/earthquake/earthquake.entity';
import { EarthquakeService } from 'src/earthquake/earthquake.service';
import { DefaultPagination, Pagination } from 'src/utils/pagination.gql-type';
import { Repository } from 'typeorm';

@Resolver()
export class EarthquakeResolver {
  constructor(
    private readonly earthquakeService: EarthquakeService,
    @InjectRepository(Earthquake)
    private readonly earthquakeRepository: Repository<Earthquake>,
  ) {}

  @Query(() => Earthquakes)
  earthquakes(
    @Args('pagination', {
      type: () => Pagination,
      defaultValue: DefaultPagination,
    })
    pagination: Pagination,
    @Args('earthquakesInput', {
      type: () => EarthquakeFiltersInput,
      nullable: true,
      description: 'Returns entries for current date if nothing provided.',
    })
    earthquakeFiltersInput?: EarthquakeFiltersInput,
  ) {
    return this.earthquakeService.getEarthquakes(
      pagination,
      earthquakeFiltersInput,
    );
  }

  @Mutation(() => Earthquake)
  async earthquakeUpdate(
    @Args('earthquakeExternalId', { type: () => String })
    earthquakeExternalId: Earthquake['externalId'],
    @Args('earthquakeInput', { type: () => EarthquakeInput })
    earthquakeInput: EarthquakeInput,
  ) {
    const earthquakeEntry = await this.earthquakeRepository.findOneOrFail({
      where: { externalId: earthquakeExternalId },
    });

    await this.earthquakeRepository.update(earthquakeEntry.id, earthquakeInput);

    return this.earthquakeRepository.findOneOrFail({
      where: { externalId: earthquakeExternalId },
    });
  }
}
