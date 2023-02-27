import { Component } from '@angular/core';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { TitleStrategy } from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']

})
export class SearchBookingComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private _snackBar: MatSnackBar) {
    this.matIconRegistry.addSvgIcon(
      'close_button_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/close_button_icon.svg')
    );
  }

  bookingFound = false; //shows or hides "Din bokning"
  bookingNotFound = false; //Shows "Bokningen kunde inte hittas"

  //Input fields: 
  userName = "";
  userID = ""

  //Hämtat från server: 
  bookedName = "";
  bookedDate = "";
  bookedTime = "";
  documentID = "";

  //Kontroll av fält:
  nameCtrl = new FormControl('', [Validators.required]);
  personnummerCtrl = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);

  async searchForBooking() {

    if (this.nameCtrl.valid && this.personnummerCtrl.valid) {

      const q = query(collection(db, "items"), where("Personnummer", "==", this.userID), where("name", "==", this.userName));

      this.personnummerCtrl.reset(); 
      this.nameCtrl.reset();

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        this.bookingNotFound = true;
        this.bookingFound = false;

      } else {
        querySnapshot.forEach((doc) => {
          this.documentID = doc.id;
          this.bookedName = doc.data()['name'];
          let timestamp = new Timestamp(doc.data()['Datum']['seconds'], doc.data()['Datum']['nanoseconds']);
          this.bookedDate = timestamp.toDate().toLocaleString("sv-SE", { dateStyle: "short" });

          if (doc.data()['Slot']['time1']) {
            this.bookedTime = "9-12";
          } else if (doc.data()['Slot']['time2']) {
            this.bookedTime = "12-15";
          } else if (doc.data()['Slot']['time3']) {
            this.bookedTime = "15-18";
          }

          this.bookingFound = true;
          this.bookingNotFound = false;

        });
      }
    }
  }

  cancelBooking() {
    this.bookingFound = false;
    this.bookingNotFound = false;
    deleteDoc(doc(db, "items", this.documentID));
    this._snackBar.open('Du har avbokat din tid', 'Stäng', {
      duration: 10000,
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar']
    });
  }

  //Test för att lägga till personen "Sven" 
  addBooking() {
    setDoc(doc(db, "items", "test"), {
      Datum: new Date(),
      Personnummer: "111111-1111",
      Slot: { time1: true, time2: false, time3: true },
      name: "Sven"
    });
  }

  getNameErrorMessage() {
    return 'Ange ditt för och efternamn.';
  }

  getPerNumErrorMessage() {
    return 'Skriv in ditt personnummer på formen (YYMMDD-XXXX).';
  }


}
