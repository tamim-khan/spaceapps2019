import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fire-report',
  templateUrl: './fire-report.component.html',
  styleUrls: ['./fire-report.component.scss']
})
export class FireReportComponent implements OnInit {
  showForm = false;

  constructor(
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<FireReportComponent>
  ) { }

  ngOnInit() { }

  geolocate() {
    if (!navigator) {
      console.log('Error sorry no nav');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        if (pos) {
          this.addReport(pos.coords.longitude, pos.coords.latitude);
          this.snackbar.open('Added New Fire Report', 'Okay', { duration: 1500 });

          this.dialogRef.close(true);
        }

        this.snackbar.open('You need to allow GPS usage in order to locate a fire', 'Okay', { duration: 1500 });
      },
      err => {
        console.log('Error ' + err);
      }
    );
  }

  addReport(long: number, lat: number) {
    const date = new Date();

    this.db.collection('fires').add({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [long, lat]
      },
      properties: {
        userReport: true,
        date,
        time: date.getHours() + ':' + date.getMinutes()
      }
    });
  }
}
