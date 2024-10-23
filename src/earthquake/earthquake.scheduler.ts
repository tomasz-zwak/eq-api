import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EarthquakeScheduler {
  private readonly logger = new Logger(EarthquakeScheduler.name);

  constructor() {}

  async synchronizeEarthquakes() {}

  async updateEarthquakes() {}
}
