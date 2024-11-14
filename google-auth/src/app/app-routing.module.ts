import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SuccessComponent } from './success/success/success.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'/login'
  },
  {
  path: 'login',
  component: LoginComponent
},
  {
    path: 'success',
    component:SuccessComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
