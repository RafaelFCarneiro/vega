import { Observable } from 'rxjs/Observable';
import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Http } from '@angular/http';
import { FeaturesService } from './../services/features.service';
import { MakeService } from './make.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(
    private http: Http,
    private makeService: MakeService, 
    private featuresService: FeaturesService
  ) { }

  create(vehicle: SaveVehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) : Observable<Vehicle> {
    return this.http.put(`${this.vehiclesEndpoint}/${vehicle.id}`, vehicle)
      .map(res => res.json());
  }

  delete(id: number) {
    return this.http.delete(`${this.vehiclesEndpoint}/${id}`)
      .map(res => res.json());    
  }
  
  getVehicle(id: number) : Observable<Vehicle> {
    return this.http.get(`${this.vehiclesEndpoint}/${id}`)
      .map(res => res.json());
  }

  getVehicles(filter?: any) : Observable<Vehicle[]> {
    return this.http.get(`${this.vehiclesEndpoint}?${this.toQueryString(filter)}`)
      .map(res => res.json());
  }

  getMakes() {
    return this.makeService.getMakes();
  }

  getFeatures() {
    return this.featuresService.getFeatures();
  }

  private toQueryString(obj?: any) {
    const parts: String[] = [];
    Object.keys(obj || {}).map(prop => {
      const value = obj[prop];
      if (value != null && value != undefined)
        parts.push(`${encodeURIComponent(prop)}=${encodeURIComponent(value)}`);
    }); 
    return parts.join('&');
  }
}
