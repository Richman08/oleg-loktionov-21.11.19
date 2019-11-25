import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCities() {
    return this.apiService.get('autocomplete-search.json');
  }

  getCurrentCityWeather() {
    return this.apiService.get('current-city.json');
  }

  // getDefaultCityWeather(id) {
  //   return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/215854');
  // }
}
