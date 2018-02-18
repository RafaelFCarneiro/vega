import { FeaturesService } from './../app/services/features.service';
import { MakeService } from './make.service';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleService {

  constructor(
    private makeService: MakeService, 
    private featuresService: FeaturesService
  ) { }

  getMakes() {
    return this.makeService.getMakes();
  }

  getFeatures() {
    return this.featuresService.getFeatures();
  }
}
