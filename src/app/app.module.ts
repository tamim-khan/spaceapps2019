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
import { MatProgressSpinnerModule, MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule, MatSnackBar, MatSnackBarModule, MatSliderModule, MatDividerModule, MatCheckboxModule } from '@angular/material';

import { keys } from '../keys';
import { FireReportComponent } from './fire-report/fire-report.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FilterWindowComponent } from './filter-window/filter-window.component';
import { AboutComponent } from './about/about.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FireReportComponent,
    AboutComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
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
  entryComponents: [
    FireReportComponent,
    AboutComponent,
    FilterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
