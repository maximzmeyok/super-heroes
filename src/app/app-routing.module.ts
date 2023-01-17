import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SelectionComponent } from './main/selection/selection.component';
import { UserInfoPageComponent } from './main/user-info-page/user-info-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'main', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
    {path: 'selection', component: SelectionComponent},
    {path: 'user', component: UserInfoPageComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
