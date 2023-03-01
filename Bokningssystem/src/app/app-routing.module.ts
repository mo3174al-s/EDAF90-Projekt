import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './app.component';
import { BookingSliderComponent } from './booking-slider/booking-slider.component';
import { SearchBookingComponent } from './search-booking/search-booking.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/hem', pathMatch: 'full' },
  { path: 'hem', component: HomeComponent },
  { path: 'boka', component: BookingSliderComponent },
  { path: 'hitta%20bokning', component: SearchBookingComponent },
  { path: 'bekräftelse/:bookingID', component: BookingConfirmationComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]; // sets up routes constant where you define your routes





@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
