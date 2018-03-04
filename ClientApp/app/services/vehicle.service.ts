import { Observable } from 'rxjs/Observable';
import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Http } from '@angular/http';
import { FeaturesService } from './../services/features.service';
import { MakeService } from './make.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(
    private http: Http,
    private makeService: MakeService, 
    private featuresService: FeaturesService
  ) { }

  create(vehicle: SaveVehicle) {
    return this.http.post('/api/vehicles', vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) : Observable<Vehicle> {
    return this.http.put(`/api/vehicles/${vehicle.id}`, vehicle)
      .map(res => res.json());
  }

  delete(id: number) {
    return this.http.delete(`/api/vehicles/${id}`)
      .map(res => res.json());    
  }
  
  getVehicle(id: number) : Observable<Vehicle> {
    return this.http.get(`api/vehicles/${id}`)
      .map(res => res.json());
  }

  getVehicles() : Observable<Vehicle[]> {
    return this.http.get('api/vehicles')
      .map(res => res.json());
  }

  getMakes() {
    return this.makeService.getMakes();
  }

  getFeatures() {
    return this.featuresService.getFeatures();
  }
}
