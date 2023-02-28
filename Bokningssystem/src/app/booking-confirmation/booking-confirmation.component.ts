import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDetailsService } from '../booking-details.service';


@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})

export class BookingConfirmationComponent {
  bookingID: string = ""
  readableDate: string = ""
  times : string = ""

  public bookingDetails: any;

  constructor(private route: ActivatedRoute, private bookingDetailsService: BookingDetailsService, private router: Router) { }

  ngOnInit() {
    this.bookingDetails = this.bookingDetailsService.getBookingDetails() ? this.bookingDetailsService.getBookingDetails() : {};
    try {
      const bookingJSON = localStorage.getItem('booking');
      if (bookingJSON) {
        const booking = JSON.parse(bookingJSON);
        this.bookingDetails = booking;
      }
    } catch (e) {
      console.error('Error retrieving booking from local storage:', e);
    }
    this.readableDate = new Date(this.bookingDetails.Datum.seconds * 1000)
      .toLocaleString("sv-SE", { dateStyle: "short" });

      var times = [];
      if (this.bookingDetails.Slot.time1){
        times.push("9-12");
      }
      if (this.bookingDetails.Slot.time2){
        times.push("12-15");
      }
      if (this.bookingDetails.Slot.time3){
        times.push("15-18");
      }
      this.times = times.join(", ");
        
    this.route.paramMap.subscribe(params => {
      this.bookingID = params.get('bookingID')?.toString() || '';
    });
  }

  returnToBookingPage(){
    this.router.navigate(['/boka']);
  }

}



// 