import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[] = [];
  models: any[] = [];
  features: any[] = [];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '', 
      phone: '', 
      email: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { 
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    })
  }

  ngOnInit() {
    const vehicleId = this.vehicle.id;
    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (vehicleId)
      sources.push(this.vehicleService.getVehicle(vehicleId));
    
    Observable.forkJoin(sources)
      .subscribe(data => {
        this.makes = data[0];
        this.features = data[1];
        
        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
          
      
        }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);  
      });    
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(v => v.id);
  } 

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
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
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Sucecss',
            msg: 'The vehicle was sycessufully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          })
        });
    } else {
      this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
    }    
  }
}
