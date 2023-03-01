import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent} from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MenyBarComponent} from './meny-bar/meny-bar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from "@angular/material/input";
import { CalendarComponent } from './calendar/calendar.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { SearchBookingComponent } from './search-booking/search-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule } from '@angular/common/http';
import { BookingSliderComponent } from './booking-slider/booking-slider.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { HomeComponent } from './home/home.component';
import { MatDividerModule } from '@angular/material/divider'
 



@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    MatTabsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatStepperModule,
    MatSnackBarModule,
    RouterModule,
    AppRoutingModule,
    MatDividerModule
    
  ],
  declarations: [ AppComponent, MenyBarComponent, CalendarComponent, SearchBookingComponent, BookingSliderComponent, BookingConfirmationComponent, HomeComponent],
  bootstrap: [ AppComponent ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'sv-SE' }]
})
export class AppModule {}