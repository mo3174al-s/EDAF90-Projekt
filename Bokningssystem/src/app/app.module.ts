import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MenyBarComponent} from './meny-bar/meny-bar.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    MatTabsModule
  ],
  declarations: [ AppComponent, MenyBarComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {}