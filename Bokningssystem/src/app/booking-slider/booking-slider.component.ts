import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-slider',
  templateUrl: './booking-slider.component.html',
  styleUrls: ['./booking-slider.component.css']
})
export class BookingSliderComponent {
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) { }
}
