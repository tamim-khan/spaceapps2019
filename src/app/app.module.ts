import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
// tslint:disable-next-line:max-line-length
import { MatProgressSpinnerModule, MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule, MatSnackBar, MatSnackBarModule, MatSliderModule, MatDividerModule } from '@angular/material';

import { keys } from '../keys';
import { FireReportComponent } from './fire-report/fire-report.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FireReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(keys.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  entryComponents: [FireReportComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
