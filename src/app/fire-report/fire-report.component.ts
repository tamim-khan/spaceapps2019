import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-fire-report',
  templateUrl: './fire-report.component.html',
  styleUrls: ['./fire-report.component.scss']
})
export class FireReportComponent implements OnInit {
  showForm = false;

  constructor(
    private db: AngularFirestore,
    private dialogRef: MatDialogRef<FireReportComponent>
  ) { }

  ngOnInit() {
  }

  geolocate() {
    if (!navigator) {
      console.log('Error sorry no nav');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        if (pos) {
          this.addReport(pos.coords.longitude, pos.coords.latitude);
        }

        this.dialogRef.close();
      },
      err => {
        console.log('Error ' + err);
      }
    );
  }

  addReport(long: number, lat: number) {
    this.db.collection('fires').add({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [long, lat]
      },
      properties: {
        date: new Date()
      }
    });
  }
}
