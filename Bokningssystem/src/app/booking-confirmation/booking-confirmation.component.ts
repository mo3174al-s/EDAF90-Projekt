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
  date: string = ""
  times: string = ""
  urlID: string = ""

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
    this.date = this.bookingDetails.datum;
    this.times = this.bookingDetails.tider;
    this.bookingID = this.bookingDetails.ID;

    this.route.paramMap.subscribe(params => {
      this.urlID = params.get('bookingID')?.toString() || '';
    });
  }

  returnToBookingPage() {
    this.router.navigate(['/boka']);
  }

}
