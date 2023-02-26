import { Component, EventEmitter, Output } from '@angular/core';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { startOfDay, endOfDay } from 'date-fns';
import { FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selected: Date | undefined;
  today = startOfDay(new Date());
  booked = { "time1": false, "time2": false, "time3": false };
  button1Clicked = false;
  button2Clicked = false;
  button3Clicked = false;
  @Output() timeBooked = new EventEmitter<boolean>();


  onButtonClick(buttonNumber: number) {
    if (buttonNumber === 1) {
      this.button1Clicked = !this.button1Clicked;
    } else if (buttonNumber === 2) {
      this.button2Clicked = !this.button2Clicked;
    } else if (buttonNumber === 3) {
      this.button3Clicked = !this.button3Clicked;
    }
    this.timeBooked.emit(this.button1Clicked || this.button2Clicked || this.button3Clicked);
  }

  async bookRoom() {
    var toBeBooked = { time1: this.button1Clicked, time2: this.button2Clicked, time3: this.button3Clicked };
    try {
      const docRef = await addDoc(collection(db, "items"), {
        Datum: this.selected,
        Slot: toBeBooked
      });
      this.booked = toBeBooked;
      this.button1Clicked = false;
      this.button2Clicked = false;
      this.button3Clicked = false;
      this.timeBooked.emit(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async onDateChange(event: any) {
    this.button1Clicked = false;
    this.button2Clicked = false;
    this.button3Clicked = false;
    this.timeBooked.emit(false);
    
    const startTimestamp = firebase.firestore.Timestamp.fromMillis(startOfDay(event).getTime());
    const endTimestamp = firebase.firestore.Timestamp.fromMillis(endOfDay(event).getTime());

    const q = query(collection(db, "items"), where("Datum", ">=", startTimestamp), where("Datum", "<=", endTimestamp));

    this.booked = { "time1": false, "time2": false, "time3": false };

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          this.booked.time1 = doc.data()['Slot'].time1;
          this.booked.time2 = doc.data()['Slot'].time2;
          this.booked.time3 = doc.data()['Slot'].time3;
        });
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
    }

  }

}
