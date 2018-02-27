import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[] = [];
  models: any[] = [];
  features: any[] = [];
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);    
    
    this.vehicleService.getFeatures()
      .subscribe(features => this.features = features);
  }

  onMakeChange() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId: number, $event: any) {
    const features = this.vehicle.features;
    if ($event.target.checked) {
      features.push(featureId);
    } else {
      const index = features.indexOf(featureId);
      features.splice(index, 1);
    }
  }

  onSubmit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }
}
