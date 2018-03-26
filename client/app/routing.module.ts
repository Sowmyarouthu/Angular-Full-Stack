import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TeslaComponent } from './tesla/tesla.component';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { CatsBreedComponent } from './catsbreed/catsBreed.component';
import { MasterComponent } from './master/master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contact/contacts.component';
const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'main', component: MasterComponent, 
  children: [
    { path: '', redirectTo:'about', pathMatch:'full'},
    { path: 'about', component: AboutComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'cars/:id', component: CarsComponent },  
    { path: 'tesla', component:CarsComponent},
    { path: 'contact', component: ContactsComponent },  
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
