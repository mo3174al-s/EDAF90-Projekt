import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CalendarComponent } from '../calendar/calendar.component';
import { db } from 'src/environments/environment';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Router } from '@angular/router';
import { BookingDetailsService } from '../booking-details.service';

@Component({
  selector: 'app-booking-slider',
  templateUrl: './booking-slider.component.html',
  styleUrls: ['./booking-slider.component.css']
})
export class BookingSliderComponent implements AfterViewInit {
  calendarValid = false;
  submitted = false;
  date: Date | undefined;
  toBeBooked = { time1: false, time2: false, time3: false };
  nameCtrl = new FormControl('', [Validators.required]);
  personnummerCtrl = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);
  namn = "";
  personnummer = "";
  booking = { ID: "", namn: "", personnummer: "", datum: "", tider: "" };

  
  ngAfterViewInit() {
    
  }

  @ViewChild(CalendarComponent)
  private calendarComponent!: CalendarComponent;

  setBookingDetails() {
    console.log("skickar: " + this.booking)
    this.bookingDetailsService.setBookingDetails(this.booking)
  }

  async book() {

    this.namn = this.nameCtrl.value ? this.nameCtrl.value : ""; 
    this.personnummer = this.personnummerCtrl.value ? this.personnummerCtrl.value : ""; 

    this.calendarComponent.bookRoom();
    const q = query(collection(db, "items"), where("Personnummer", "==", this.personnummer), where("name", "==", this.namn)
      , where("Datum", '==', this.date));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.booking.ID = doc.id;
      this.booking.namn = this.namn;
      this.booking.personnummer = this.personnummer;
      this.setBookingDetails();
      try {
        localStorage.setItem('booking', JSON.stringify(this.booking));
      } catch (e) {
        console.error('Error saving booking to local storage:', e);
      }
      this.router.navigate(['/bekräftelse', this.booking.ID]);
    })
  }

  getNameErrorMessage() {
    return 'Ange ditt för och efternamn.';
  }

  getPerNumErrorMessage() {
    return 'Skriv in ditt personnummer på formen (YYMMDD-XXXX).';
  }

  onTimeBooked(value: boolean) {
    this.calendarValid = value;
  }

  onDateChange(value: any) {
    this.date = value;
    this.booking.datum =  this.date ? this.date.toLocaleString("sv-SE", { dateStyle: "short" }): "" ;
  }

  getInfo(event: any){
    this.namn = this.nameCtrl.value ? this.nameCtrl.value : ""; 
    this.personnummer = this.personnummerCtrl.value ? this.personnummerCtrl.value : ""; 
  }

  onTimes(value: any) {
    this.toBeBooked = value;
    var times = [];
      if (this.toBeBooked.time1) {
        times.push("9-12");
      }
      if (this.toBeBooked.time2) {
        times.push("12-15");
      }
      if (this.toBeBooked.time3) {
        times.push("15-18");
      }
      this.booking.tider = times.join(", ");
  }

  firstFormGroup = this._formBuilder.group({
    
  });
  secondFormGroup = this._formBuilder.group({

  });

  constructor(private _formBuilder: FormBuilder, private router: Router, private bookingDetailsService: BookingDetailsService) { }

}
