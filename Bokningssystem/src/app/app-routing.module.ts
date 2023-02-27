import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { HomeComponent } from './app.component';
import { BookingSliderComponent } from './booking-slider/booking-slider.component';
import { SearchBookingComponent } from './search-booking/search-booking.component';


const routes: Routes = [
  { path: 'hem', component: HomeComponent },
  {path: 'boka', component: BookingSliderComponent},
  {path: 'hitta%20bokning', component: SearchBookingComponent}

]; // sets up routes constant where you define your routes





@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
