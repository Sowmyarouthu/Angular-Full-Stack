import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;

  addCatForm: FormGroup;
  modelname = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  power = new FormControl('', Validators.required);
  color = new FormControl([[], Validators.required]);
  make = new FormControl([[], Validators.required]);
  category = new FormControl([[], Validators.required]);


  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

  constructor(private catService: CatService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();
    this.addCatForm = this.formBuilder.group({
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



  getCats() {
    this.catService.getCats().subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat: Cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
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
