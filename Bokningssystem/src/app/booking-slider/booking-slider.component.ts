import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'app-booking-slider',
  templateUrl: './booking-slider.component.html',
  styleUrls: ['./booking-slider.component.css']
})
export class BookingSliderComponent {
  calendarValid = false;
  submitted = false;
  date: Date | undefined;
  toBeBooked = { time1: false, time2: false, time3: false };
  nameCtrl = new FormControl('', [Validators.required]);
  personnummerCtrl = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);
  namn = "";
  personnummer = "";
  button1Clicked = false;
  button2Clicked = false;
  button3Clicked = false;

  async book() {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        Datum: this.date,
        Slot: this.toBeBooked,
        name: this.namn,
        Personnummer: this.personnummer
      });
    

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getNameErrorMessage() {
    return 'Please enter your name.';
  }

  getPerNumErrorMessage() {
    return 'Please enter a valid personal number (YYMMDD-XXXX).';
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
