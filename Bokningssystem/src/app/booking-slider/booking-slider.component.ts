import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking-slider',
  templateUrl: './booking-slider.component.html',
  styleUrls: ['./booking-slider.component.css']
})
export class BookingSliderComponent {

  calendarValid = false;
  submitted = false;

  onTimeBooked(value: boolean) {
    this.calendarValid = value;
  }

  firstFormGroup = this._formBuilder.group({
  });
  secondFormGroup = this._formBuilder.group({
  });



  constructor(private _formBuilder: FormBuilder) { }

}
