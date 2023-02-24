import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from "firebase/firestore";
//import { db } from '../environments/environment';

/* // Add a new document in collection "cities"
await setDoc(doc(db, "items", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
}); */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Bokningssystem';
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }
}

