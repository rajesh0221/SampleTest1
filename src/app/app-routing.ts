import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
const appRoutes: Routes = [
    { path: '', component: LoginComponent },
     { path: 'signup', component: EmployeeComponent },
     {path:'user',component: EmployeeListComponent},
      {path:'dashboard',component: DashboardComponent}
];

export const routing = RouterModule.forRoot(appRoutes);