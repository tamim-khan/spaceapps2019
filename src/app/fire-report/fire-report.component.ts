import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fire-report',
  templateUrl: './fire-report.component.html',
  styleUrls: ['./fire-report.component.scss']
})
export class FireReportComponent implements OnInit {
  reportForm = this.formBuilder.group({
    lat: new FormControl(0, [Validators.required, Validators.min(-90), Validators.max(90)]),
    long: new FormControl(0, [Validators.required, Validators.min(-180), Validators.max(180)]),
    description: ''
  });

  get latValid(): boolean {
    return this.reportForm.get('lat').valid;
  }

  get longValid(): boolean {
    return this.reportForm.get('long').valid;
  }

  constructor(
    private formBuilder: FormBuilder,
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
          this.reportForm.patchValue({
            long: pos.coords.longitude,
            lat: pos.coords.latitude
          });
        } else {
          this.snackbar.open('You need to allow GPS usage in order to use your current location', 'Okay', { duration: 1500 });
        }
      },
      err => {
        console.log('Error ' + err);
      }
    );
  }

  addReport() {
    if (!this.reportForm.valid || !this.latValid || !this.longValid) {
      this.snackbar.open('Please enter valid values for the longitude and latitude', 'Okay', { duration: 1500 });
      return;
    }

    const date = new Date();
    const data = this.reportForm.value;
    const minutes = date.getMinutes();

    const fire = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [data.long, data.lat]
      },
      properties: {
        userReport: true,
        date,
        time: date.getHours() + ':' + (minutes > 10 ? date.getMinutes() : '0' + minutes)
      }
    };

    if (data.description !== '' && data.description != null && data.description !== ' ') {
      // @ts-ignore
      fire.properties.description = data.description;
    }

    this.db.collection('fires').add(fire).then(() => {
      this.snackbar.open('Added New Fire Report', 'Okay', { duration: 1500 });
      this.dialogRef.close(true);
    });
  }
}
