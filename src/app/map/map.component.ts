import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { TranslationWidth } from '@angular/common';
import { keys } from '../../keys';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  mapNav: mapboxgl.NavigationControl;

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    mapboxgl.accessToken = keys.mapbox;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 1,
    });

    this.mapNav = new mapboxgl.NavigationControl();
    this.map.addControl(this.mapNav, 'bottom-right');
  }

}
