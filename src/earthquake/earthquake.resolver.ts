import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Earthquake } from 'src/earthquake/earthquake.entity';

@Resolver()
export class EarthquakeResolver {
  constructor() {}

  @Query(() => String)
  earthquakes() {
    return 'Hello world';
  }

  @Mutation(() => Earthquake)
  async earthquakeUpdate() {
    //
  }
}
