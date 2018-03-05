import { KeyValuePair } from './../../models/key-value-pair';
import { Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  // That was used at client filtering context
  // allVehicles: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  makes: KeyValuePair[] = [];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
    this.populateVehicles();    
  }

  onFilterChange() {
    // That was used at client filtering context
    //
    // let vehicles = this.allVehicles;    
    // if (this.filter.makeId)
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    // this.vehicles = vehicles;
    //
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => {
        // That was used at client filtering context
        // this.vehicles = this.allVehicles = vehicles
        this.vehicles = vehicles
      });    
  }
}
