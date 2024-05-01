import { Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@Resolver()
export class AppResolver {
  @Query(() => GraphQLJSON)
  async test() {
    return 'test';
  }
}
