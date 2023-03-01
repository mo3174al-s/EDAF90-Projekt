import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../environments/environment';
import { MenyBarComponent } from './meny-bar/meny-bar.component';



// Add a new document in collection "cities"
/* setDoc(doc(db, "items", "kursnamn"), {
  name: "EDAF90"
}); */

//deleteDoc(doc(db, "items", "kursnamn"));

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

@Component({
  selector: 'app-home',
  template: `
  <div style="margin:20px">
    <h1>Oops..!</h1>
    <h2>Sidan kunde inte hittas</h2>
</div>
`
})
export class PageNotFoundComponent { }

