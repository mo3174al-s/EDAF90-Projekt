import { Component, ElementRef, ViewChild } from '@angular/core';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from 'src/environments/environment';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Timestamp } from 'firebase/firestore';
import { TitleStrategy } from '@angular/router';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import id from 'date-fns/locale/id/index';

@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']

})
export class SearchBookingComponent {
  @ViewChild('pnInput') pnInputRef!: ElementRef;
  @ViewChild('namnInput') namnInputRef!: ElementRef;


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private _snackBar: MatSnackBar) {
    this.matIconRegistry.addSvgIcon(
      'close_button_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/close_button_icon.svg')
    );
  }

  //Samla alla "bokningar" i en person: OBS lokala variabler 
  bookingsArray: any[] = [];

  bookingNotFound = false; //Shows "Bokningen kunde inte hittas"

  //Input fields: 
  userName = "";
  userID = ""

  //Hämtat från server: 
 /*  bookedName = "";
  bookedDate = "";
  bookedTime = "";
  documentID = ""; */

  //Kontroll av fält:
  nameCtrl = new FormControl('', [Validators.required]);
  personnummerCtrl = new FormControl('', [Validators.pattern(/^\d{6}-\d{4}$/)]);

  async searchForBooking() {

    if (this.nameCtrl.valid && this.personnummerCtrl.valid) {

      this.userName = this.nameCtrl.value ? this.nameCtrl.value : ""; 
      this.userID = this.personnummerCtrl.value ? this.personnummerCtrl.value : ""; 


      const q = query(collection(db, "items"), where("Personnummer", "==", this.userID), where("search", "==", this.userName.toLowerCase()));


      this.namnInputRef.nativeElement.blur();
      this.pnInputRef.nativeElement.blur();
      this.personnummerCtrl.reset();
      this.nameCtrl.reset();

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.bookingNotFound = true;

      } else {
        this.bookingsArray = [];
        querySnapshot.forEach((doc) => {
         /*  this.documentID = doc.id;
          this.bookedName = doc.data()['name']; */
          let timestamp = new Timestamp(doc.data()['Datum']['seconds'], doc.data()['Datum']['nanoseconds']);
           let bookedDate = timestamp.toDate().toLocaleString("sv-SE", { dateStyle: "short" });


          let bookedTime = "";
          if (doc.data()['Slot']['time1'] && doc.data()['Slot']['time2'] && doc.data()['Slot']['time3']) {
            bookedTime = "9-18";
          } else if (doc.data()['Slot']['time1'] && doc.data()['Slot']['time2']) {
            bookedTime = "9-15";
          } else if (doc.data()['Slot']['time1'] && doc.data()['Slot']['time3']) {
            bookedTime = "9-12, 15-18";
          } else if (doc.data()['Slot']['time2'] && doc.data()['Slot']['time3']) {
            bookedTime = "12-18";
          } else if (doc.data()['Slot']['time1']) {
            bookedTime = "9-12";
          } else if (doc.data()['Slot']['time2']) {
            bookedTime = "12-15";
          } else if (doc.data()['Slot']['time3']) {
            bookedTime = "15-18";
          }


          this.bookingNotFound = false;

          this.bookingsArray.push(
            {
              bookingFound : true,
              bookingID : doc.id, 
              bookedName : doc.data()['name'],
              bookedDate : timestamp.toDate().toLocaleString("sv-SE", { dateStyle: "short" }),
              bookedTime : bookedTime
            }
          ); 
        });
      }
    }
  }

  cancelBooking(booking: any) {
    console.log("nu");
    this.bookingNotFound = false;
    booking.bookingFound = false;
    deleteDoc(doc(db, "items", booking.bookingID));
    this._snackBar.open('Du har avbokat din tid', 'Stäng', {
      duration: 10000,
      verticalPosition: 'bottom',
      //panelClass: ['custom-snackbar']
    });
  }

  //Test för att lägga till personen "Sven" 
  addBooking() {
    setDoc(doc(db, "items", "test"), {
      Datum: new Date(),
      Personnummer: "111111-1111",
      Slot: { time1: true, time2: false, time3: true },
      name: "Sven",
      search: "sven"
    });
    setDoc(doc(db, "items", "test2"), {
      Datum: new Date(),
      Personnummer: "111111-1111",
      Slot: { time1: false, time2: true, time3: false },
      name: "Sven",
      search: "sven"
    });
  }

  getNameErrorMessage() {
    return 'Ange ditt för och efternamn.';
  }

  getPerNumErrorMessage() {
    return 'Skriv in ditt personnummer på formen (YYMMDD-XXXX).';
  }

  async deleteAllDocuments() {
    //Deletes all documents in firestore:
    const q = query(collection(db, "items"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((document) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(document.id, " => ", document.data());
      deleteDoc(doc(db, "items", document.id));
    });

    this._snackBar.open('Alla bokningar har tagits bort', 'Stäng', {
      duration: 10000,
      verticalPosition: 'bottom',
      //panelClass: ['custom-snackbar']
    });
  }


}
