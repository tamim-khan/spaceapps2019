import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fire-report',
  templateUrl: './fire-report.component.html',
  styleUrls: ['./fire-report.component.scss']
})
export class FireReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  geolocate() {
    if (!navigator) {
      console.log('Error sorry no nav');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log('Success ');
        console.log(pos);
      },
      err => {
        console.log('Error ' + err);
      }
    );
  }

}
