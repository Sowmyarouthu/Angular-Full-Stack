import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import {CarService} from '../services/car.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  category: string;
  countcars: number;
  data: Object;
  dataSource: object;
  constructor(private carservice : CarService) {
    this.data = {
      chart: { },
      data: [
        {value: 500},
        {value: 600}
        
      ]
    };
    this.dataSource = {
      chart: {
      caption: 'Cars Details',
      subcaption: 'Last Year',
      startingangle: '120',
      showlabels: '0',
      showlegend: '1',
      enablemultislicing: '0',
      slicingdistance: '15',
      showpercentvalues: '1',
      showpercentintooltip: '0',
      plottooltext: 'Cars Sale : $label Total Sale : $datavalue',
      theme: 'ocean'
      },
      data: [
      {
      label: 'Sedan',
      value: '1250400'
      },
      {
      label: 'SUV',
      value: '1463300'
      },
      {
      label: 'Sport',
      value: '1050700'
      },
      {
      label: 'Economy',
      value: '491000'
      }
      ]
      }
      
      this.carservice.getCarsbycategory().subscribe(
        res=> {console.log("Dashboard",res)},
        error => console.log(error)
        
      )
  }



  ngOnInit() {
    
  }

}
