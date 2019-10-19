import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { keys } from '../../keys';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  mapNav: mapboxgl.NavigationControl;

  constructor(private http: HttpClient, private fireStore: AngularFireStorage) { }

  ngOnInit() {
    this.initMap();

    this.map.on('load', () => {
      this.fireStore.ref('world_fire_data_7d.json').getDownloadURL().subscribe(url => {
        this.http.get(url).pipe(tap(res => this.addLayer(res))).subscribe();
      });
    });
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
