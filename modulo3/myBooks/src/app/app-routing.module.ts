import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

 
const routes: Routes = [
   { path: '', component: HomeComponent }, // página principal
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // fallback a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
