import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CarService } from '../services/car.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-tesla',
  templateUrl: './tesla.component.html',
  styleUrls: ['./tesla.component.css']
})
export class TeslaComponent implements OnInit {

  car = new Car();
  cars: Car[] = [];
  isLoading = true;
  isEditing = false;

  addCarForm: FormGroup;
  modelname = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  power = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  make = new FormControl('', Validators.required);
  category = new FormControl([[], Validators.required]);


  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCars();
    this.addCarForm = this.formBuilder.group({
      modelname: this.modelname,
      year: this.year,
      power: this.power,
      color:this.color,
      make: this.make,
      category: this.category,
    });
  //  this.dropdownList = [
  //                             {"id":1,"itemName":"UnitedStates"},
  //                             {"id":2,"itemName":"Canada"},
  //                             {"id":3,"itemName":"India"},
  //                             {"id":4,"itemName":"Australia"},
  //                             {"id":5,"itemName":"Netherlands"},
                              
  //                           ];
  // this.selectedItems = [
  //                       {"id":2,"itemName":"Canada"},
  //                       {"id":3,"itemName":"India"},
  //                       {"id":4,"itemName":"Australia"},
  //                       {"id":5,"itemName":"Netherlands"},
  //                       {"id":6,"itemName":"UnitedStates"},
  //                     ];
                    
  // this.dropdownSettings = { 
  //                           text: " Select Region      ",
  //                           selectAllText: 'Select All',
  //                           unSelectAllText: 'UnSelect All',
  //                           classes:"myclass custom-class",
  //                           buttonClasses: 'btn btn-default btn-block'
  //                         };   
   }



  getCars() {
    this.carService.getCars(this.make.value).subscribe(
      data => this.cars = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCar() {
    this.carService.addCar(this.addCarForm.value).subscribe(
      res => {
        this.cars.push(res);
        this.addCarForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(car: Car) {
    this.isEditing = true;
    this.car = car;
  }

  cancelEditing() {
    this.isEditing = false;
    this.car = new Car();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cars to reset the editing
    this.getCars();
  }

  editCar(car: Car) {
    this.carService.editCar(car).subscribe(
      () => {
        this.isEditing = false;
        this.car = car;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCar(car: Car) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.carService.deleteCar(car).subscribe(
        () => {
          const pos = this.cars.map(elem => elem._id).indexOf(car._id);
          this.cars.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

   onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

}
