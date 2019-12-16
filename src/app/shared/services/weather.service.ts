import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'http://dataservice.accuweather.com/';
  apikey = 'J1LlVzS5uw2srgtUy52vGqQdZnfuNX0k';

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCityWeather(id) {
    return this.http.get(`${this.apiUrl}currentconditions/v1/${id}?apikey=${this.apikey}&details=false`);
  }

  getDefaultCityWeather(id) {
    return this.http.get(`${this.apiUrl}currentconditions/v1/${id}?apikey=${this.apikey}&details=false`);
  }

  getDailyForecast(id) {
    return this.http.get(`${this.apiUrl}forecasts/v1/daily/5day/${id}?apikey=${this.apikey}&details=false&metric=true`);
  }
}
