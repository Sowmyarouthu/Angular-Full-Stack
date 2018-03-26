import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: Object;
  dataSource: object;
  constructor() {
    this.data = {
      chart: { },
      data: [
        {value: 500},
        {value: 600},
        {value: 700}
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
      label: 'Audi',
      value: '1250400'
      },
      {
      label: 'Tesla',
      value: '1463300'
      },
      {
      label: 'Benz',
      value: '1050700'
      },
      {
      label: 'BMW',
      value: '491000'
      }
      ]
      }
  }

  ngOnInit() {
    
  }

}
