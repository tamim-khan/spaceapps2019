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
import { MatProgressSpinnerModule, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { keys } from '../keys';
import { FireReportComponent } from './fire-report/fire-report.component';

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
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(keys.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  entryComponents: [FireReportComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
