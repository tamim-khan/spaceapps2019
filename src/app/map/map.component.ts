import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { keys } from '../../keys';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material';
import { FireReportComponent } from '../fire-report/fire-report.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  mapNav: mapboxgl.NavigationControl;
  hasData = false;

  constructor(
    private http: HttpClient,
    private fireStore: AngularFireStorage,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initMap();

    this.map.on('load', () => {
      console.log('done loading');
      this.fireStore.ref('world_fire_data_7d.json').getDownloadURL().subscribe(url => {
        this.http.get(url).pipe(tap(res => {
          this.addLayer(res);
          setTimeout(() => this.hasData = true, 1200);
        })).subscribe();
      });
    });
  }

  nearMe() {
    if (!navigator) {
      console.log('Error sorry no nav');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        if (pos) {
          // pan to
          // this.addReport(pos.coords.longitude, pos.coords.latitude);
          this.map.flyTo({
            center: [
              pos.coords.longitude,
              pos.coords.latitude
          ],
          zoom: 9
          });
        }
      },
      err => {
        console.log('Error ' + err);
      }
    );
  }

  report() {
    this.dialog.open(FireReportComponent);
  }

  private initMap() {
    // @ts-ignore
    mapboxgl.accessToken = keys.mapbox;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1
    });

    // add navbar
    this.mapNav = new mapboxgl.NavigationControl();
    this.map.addControl(this.mapNav, 'bottom-right');
  }

  private addLayer(data: any) {
    // adding two layes one for heatmap and one for circle
    this.map.addLayer({
      id: 'firemap-heatmap',
      type: 'heatmap',
      source: {
        type: 'geojson',
        data
      },
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          0, 0,
          6, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          9, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(255,140,0)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          9, 20
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 1,
          9, 0
        ]
      }
    });

    this.map.addLayer({
      id: 'firemap-circle',
      type: 'circle',
      source: {
        type: 'geojson',
        data
      },
      paint: {
        'circle-radius': 3,
        'circle-color': '#ff8c00',
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 0,
          8, 1
        ],
        'circle-stroke-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          7, 0,
          8, 1
        ]
      }
    });
  }

}
