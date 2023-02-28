import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailsService {

  public bookingDetails: any;

  constructor() { }

  setBookingDetails(booking: any){
    this.bookingDetails = booking;
  }

  getBookingDetails(){
    return this.bookingDetails;
  }
}
