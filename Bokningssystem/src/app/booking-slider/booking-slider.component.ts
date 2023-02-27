import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { startOfDay, endOfDay } from 'date-fns';
import { CalendarComponent } from '../calendar/calendar.component';

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

  ngAfterViewInit() {
  }

  @ViewChild(CalendarComponent)
  private calendarComponent!: CalendarComponent;

  book() {
    this.calendarComponent.bookRoom();

  }

  reset() {
    this.nameCtrl.reset();
    this.personnummerCtrl.reset();
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
  }

  onTimes(value: any) {
    this.toBeBooked = value;
  }

  firstFormGroup = this._formBuilder.group({
  });
  secondFormGroup = this._formBuilder.group({
  });

  constructor(private _formBuilder: FormBuilder) { }

}
