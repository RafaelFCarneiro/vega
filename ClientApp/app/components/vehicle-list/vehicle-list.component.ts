import { KeyValuePair } from "./../../models/key-value-pair";
import { Vehicle } from "./../../models/vehicle";
import { VehicleService } from "./../../services/vehicle.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
  styleUrls: ["./vehicle-list.component.css"]
})
export class VehicleListComponent implements OnInit {
  // That was used at client filtering context
  // allVehicles: Vehicle[] = [];
  vehicles: Vehicle[] = [];
  makes: KeyValuePair[] = [];
  query: any = {};
  columns: any[] = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true }
  ]

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(makes => (this.makes = makes));
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
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName: string) {
    if (this.query.sortBy == columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(vehicles => {
      // That was used at client filtering context
      // this.vehicles = this.allVehicles = vehicles
      this.vehicles = vehicles;
    });
  }
}
