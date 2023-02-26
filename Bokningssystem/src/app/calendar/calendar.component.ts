import { Component } from '@angular/core';
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { startOfDay, endOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  selected: Date | undefined;
  today = startOfDay(new Date());
  booked = { "time1": false, "time2": false, "time3": false }; //hämta data från firestore här!
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

  async bookRoom() {

    var toBeBooked = { time1: false, time2: false, time3: false };

    if (this.button1Clicked) {
      toBeBooked.time1 = true;
    }
    if (this.button2Clicked) {
      toBeBooked.time2 = true;
    }
    if (this.button3Clicked) {
      toBeBooked.time3 = true;
    }

    try {
      const docRef = await addDoc(collection(db, "items"), {
        Datum: this.selected,
        Slot: toBeBooked
      });
      this.booked = toBeBooked;
      this.button1Clicked = false;
      this.button2Clicked = false;
      this.button3Clicked = false;
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  async onDateChange(event: any) {
    this.button1Clicked = false;
    this.button2Clicked = false;
    this.button3Clicked = false;
    const startTimestamp = firebase.firestore.Timestamp.fromMillis(startOfDay(event).getTime());
    const endTimestamp = firebase.firestore.Timestamp.fromMillis(endOfDay(event).getTime());
    const q = query(collection(db, "items"), where("Datum", ">=", startTimestamp), where("Datum", "<=", endTimestamp));

    this.booked = { "time1": false, "time2": false, "time3": false };

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if (doc.data()['Slot'].time1 === true) {
            this.booked.time1 = true;
          }
          if (doc.data()['Slot'].time2 === true) {
            this.booked.time2 = true;
          }
          if (doc.data()['Slot'].time3 === true) {
            this.booked.time3 = true;
          }
          // this.booked = doc.data()['Slot'];
        });
        // console.log(this.booked);
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
    }

  }

}
