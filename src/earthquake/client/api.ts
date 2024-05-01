import createClient from 'openapi-fetch';
import type { paths } from 'src/earthquake/client/earthquake-api';

export const EarthquakeApiClient = createClient<paths>({
  baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/',
});
