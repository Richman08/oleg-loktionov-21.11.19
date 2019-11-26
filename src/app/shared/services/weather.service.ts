import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCurrentCityWeather() {
    return this.apiService.get('current-city.json');
  }

  getDefaultCityWeather() {
    return this.apiService.get('default-city-weather.json');
  }

  getDailyForecast() {
    return this.apiService.get('default-city-forecast.json');
  }
}
