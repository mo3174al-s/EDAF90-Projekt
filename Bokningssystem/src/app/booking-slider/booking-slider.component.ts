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
  date : Date | undefined;
  toBeBooked = { time1: false, time2: false, time3: false};
  name = new FormControl('', [Validators.required]);
  personnummer = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);

 getNameErrorMessage() {
    return 'Please enter your name.';
  }

  getPerNumErrorMessage() {
    return 'Please enter a valid personal number (YYMMDD-XXXX).';
  }

   onTimeBooked(value: boolean) {
    this.calendarValid = value;
  }

  onDateChange(value: any){
    this.date = value;
  }

  onTimes(value: any){
    this.toBeBooked = value;
  }

  firstFormGroup = this._formBuilder.group({
  });
  secondFormGroup = this._formBuilder.group({
  });

  constructor(private _formBuilder: FormBuilder) { }

}
