import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';
import {environment} from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'http://dataservice.accuweather.com/';

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCityWeather() {
    return this.apiService.get('current-city.json');
  }

  getCityWether(id) {
    return this.http.get(`${this.apiUrl}currentconditions/v1/${id} `);
  }

  getDefaultCityWeather() {
    return this.apiService.get('default-city-weather.json');
  }

  getDailyForecast() {
    return this.apiService.get('default-city-forecast.json');
  }
}
