import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  
  submit() {
    if (this.secondFormGroup.valid) {
      const bookingData = {
        name: this.secondFormGroup.get('name')?.value,
        personnummer: this.secondFormGroup.get('personnummer')?.value,
      };
      console.log(bookingData);
    } else {
      console.log("error");
    }
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
