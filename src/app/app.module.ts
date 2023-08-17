import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { UsersRoleComponent } from './component/users-role/users-role.component';
import { PublicityComponent } from './component/publicity/publicity.component';
import { FooterComponent } from './component/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickComponent } from './component/utils/date-pick/date-pick.component';
import { CardSelectComponent } from './component/utils/card-select/card-select.component';
import { ImageSelectComponent } from './component/utils/image-select/image-select.component';
import { PlacesComponent } from './component/places/places.component';
import { NewPlacesComponent } from './component/places/new-places/new-places.component';
import { JourneyComponent } from './component/journey/journey.component';
import { CreateJourneyComponent } from './component/journey/create-journey/create-journey.component';
import { ReservationsComponent } from './component/reservations/reservations.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    UserDetailsComponent,
    UsersRoleComponent,
    PublicityComponent,
    FooterComponent,
    DatePickComponent,
    CardSelectComponent,
    ImageSelectComponent,
    PlacesComponent,
    NewPlacesComponent,
    JourneyComponent,
    CreateJourneyComponent,
    ReservationsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
