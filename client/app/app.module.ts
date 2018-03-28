import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { CarService } from './services/car.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';

import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {NgxPaginationModule} from 'ngx-pagination';

import { CatsBreedComponent } from './catsbreed/catsBreed.component';
import { CatBreedService } from './services/catBreed.service';
import { SideNavComponent } from './master/sidenav.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contact/contacts.component';
import { FusionChartsModule } from 'angular2-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Import FusionCharts Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
    CatsBreedComponent,
    SideNavComponent,
    MasterComponent,
    DashboardComponent,
    ContactsComponent,
   
   
  ],
  imports: [
    RoutingModule,
    SharedModule,
    AngularMultiSelectModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    FusionChartsModule.forRoot(FusionCharts, Charts)
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    CarService,
    UserService,
    CatBreedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
