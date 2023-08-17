import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { UsersRoleComponent } from './component/users-role/users-role.component';
import { PublicityComponent } from './component/publicity/publicity.component';
import { PlacesComponent } from './component/places/places.component';
import { NewPlacesComponent } from './component/places/new-places/new-places.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { JourneyComponent } from './component/journey/journey.component';
import { CreateJourneyComponent } from './component/journey/create-journey/create-journey.component';
import { ReservationsComponent } from './component/reservations/reservations.component';

const routes: Routes = [
  { path: 'login' , component:LoginComponent, canActivate:[AuthGuard]},
  { path: 'home', component:HomeComponent,canActivate:[NotAuthGuard]},
  { path:'profile', component: UserDetailsComponent ,canActivate:[NotAuthGuard]  },
  { path:'users', component: UsersRoleComponent ,canActivate:[NotAuthGuard]  },
  { path:'publicity', component: PublicityComponent  ,canActivate:[NotAuthGuard] },
  { path:'places', component: PlacesComponent  ,canActivate:[NotAuthGuard] },
  { path:'reservations', component: ReservationsComponent  ,canActivate:[NotAuthGuard] },
  { path:'journey', component: JourneyComponent  ,canActivate:[NotAuthGuard] },
  { path:'journey/create', component: CreateJourneyComponent  ,canActivate:[NotAuthGuard] },
  { path:'journey/update/:id', component: CreateJourneyComponent  ,canActivate:[NotAuthGuard] },
  { path:'places/create', component:  NewPlacesComponent  ,canActivate:[NotAuthGuard] },
  { path:'places/update/:id', component: NewPlacesComponent ,canActivate:[NotAuthGuard] },
  {path: '', redirectTo: 'login',pathMatch:'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  }
