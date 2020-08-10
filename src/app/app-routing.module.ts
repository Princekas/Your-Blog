import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { ViewComponent } from './view/view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
   { path:'',redirectTo:'home',pathMatch:'full'},
   { path:'home',component:HomeComponent},
   { path:'login', component:LoginComponent},
   { path:'signup',component:SignUpComponent},
   { path:'myblogs',component:MyblogsComponent,canActivate:[AuthGuard]},
   {path:'profile/:id',component:ProfileComponent},                // here routing parameter is id 
   {path:'edit-profile/:id',component:EditProfileComponent},      // here routing parameter is id 
   {path:'view/:postId',component:ViewComponent},
   { path:'**',redirectTo:'home'}                               //wildcard  route will be used when non of the path match
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
