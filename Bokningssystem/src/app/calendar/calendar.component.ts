import { Component } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selected: Date | undefined;
  booked = { "time1": false, "time2": true, "time3": false }; //hämta data från firestore här!
  button1Clicked = false;
  button2Clicked = false;
  button3Clicked = false;

  onButtonClick(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.button1Clicked = !this.button1Clicked;
    } else if (buttonNumber === 2) {
      this.button2Clicked = !this.button2Clicked;
    } else if (buttonNumber === 3) {
      this.button3Clicked = !this.button3Clicked;
    }
  }

  onDateChange(event: any) {
    console.log('Date changed to:', event);
  }


}
