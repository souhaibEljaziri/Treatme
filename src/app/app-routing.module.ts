import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { OxygenComponent } from './oxygen/oxygen.component';
import { PaymentsComponent } from './payments/payments.component';
import { PreferenceComponent } from './preference/preference.component';
import { AboutComponent } from './about/about.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctor-details/:id', component: DoctorDetailsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'oxygen', component: OxygenComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'preference', component: PreferenceComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
