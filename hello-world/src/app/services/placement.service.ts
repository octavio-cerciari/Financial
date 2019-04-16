import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacementService {
  URL_BACK = environment.URL_BACKEND + '/Placements';
  constructor(
    private http: HttpClient,
  ) { }

  savePlace(place) {
    return this.http.post(this.URL_BACK, place);
  }

  listPlaces() {
    return this.http.get(this.URL_BACK);
  }

  deletePlace(place) {
    return this.http.delete(`${this.URL_BACK}/${place.id}`);
  }
}
