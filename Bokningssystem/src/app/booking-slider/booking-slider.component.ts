import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  
    this.nameCtrl.markAsUntouched();
      this.nameCtrl.reset();
    // this.personnummerCtrl.clearValidators();
    // this.nameCtrl.addValidators(Validators.required);
    // this.nameCtrl.updateValueAndValidity();

    this.personnummerCtrl.markAsUntouched();
    this.personnummerCtrl.reset()
  //   this.personnummerCtrl.clearValidators();
  //   this.personnummerCtrl.addValidators(Validators.pattern(/^\d{6}-\d{4}$/));
  //   this.personnummerCtrl.addValidators(Validators.required);
  //   this.personnummerCtrl.updateValueAndValidity();
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
