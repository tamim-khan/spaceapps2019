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
    private db: AngularFireDatabase,
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

  report() {
    this.dialog.open(FireReportComponent);
  }

  private initMap() {
    // @ts-ignore
    mapboxgl.accessToken = keys.mapbox;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1,
    });

    // add navbar
    this.mapNav = new mapboxgl.NavigationControl();
    this.map.addControl(this.mapNav, 'bottom-right');
  }

  private addLayer(data: any) {
    this.map.addLayer({
      id: 'test',
      type: 'circle',
      source: {
        type: 'geojson',
        data: data
      },
      paint: {
        'circle-radius': 3,
        'circle-color': '#ff8c00',
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': 0.5
      }
    });
  }

}
