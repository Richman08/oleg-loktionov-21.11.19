import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';
import {Observable} from 'rxjs';
import {ICityInfo} from '../interfaces/cities.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  apiUrl = 'http://dataservice.accuweather.com/';
  apikey = 'x1wQAd1iMlajti2taIUdkAAZXG6LGdTf';

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCities(text): Observable<ICityInfo[]> {
    return this.http.get<ICityInfo[]>(`${this.apiUrl}locations/v1/cities/autocomplete?apikey=${this.apikey}&q=${text}`);
  }
}
