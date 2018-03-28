import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { CarService } from '../services/car.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  name : string;
  car = new Car();
  cars: Car[] = [];
  isLoading = true;
  isEditing = false;
  filteredcars: Car[];
  addCarForm: FormGroup;
  modelname = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  power = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  make = new FormControl('', Validators.required);
  category = new FormControl([[], Validators.required]);
  _listfilter: string;

  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              private route :ActivatedRoute) { 

              //  this.filteredcars  = this.cars;
               this._listfilter = "c";
              }

  ngOnInit() {
  
    this.route.params.subscribe(params => {
      this.name = params['id']; 
    this.getCars(this.name);
      
   });
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

 get listfilter() {
 return this._listfilter;
 }
 set listfilter(value: string) {
   this._listfilter = value;
   this.filteredcars = this.listfilter ? this.performfilter(this._listfilter): this.cars;
 }

 performfilter(filterby: string): Car[]{
   filterby = filterby.toLocaleLowerCase();
   return this.cars.filter((car: Car) => this.car.modelname.toLocaleLowerCase().indexOf(filterby)! == -1);

 }
    getCars(name: string) {
    console.log(name);
    this.carService.getCars(name).subscribe(
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
    this.getCars(this.name);
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
