import { QueryResult } from './../../models/query-result';
import { VehicleQuery } from './../../models/vehicle-query';
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
  private readonly PAGE_SIZE = 3;
  private readonly QUERY_INIT_VALUES = { page: 1, pageSize: this.PAGE_SIZE };
  private readonly QUERY_RESULT_INIT_VALUES = { items: [], totalItems: 1 };

  query: VehicleQuery = Object.assign({}, this.QUERY_INIT_VALUES);
  queryResult: QueryResult = Object.assign({}, this.QUERY_RESULT_INIT_VALUES);
  makes: KeyValuePair[] = [];
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
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = Object.assign({}, this.QUERY_INIT_VALUES);
    this.populateVehicles();
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

  onPageChange(page: number) {
    this.query.page = page;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query).subscribe(result => {
      this.queryResult = result;
    });
  }
}
