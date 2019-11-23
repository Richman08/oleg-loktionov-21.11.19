import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApiService} from '../../@core/api/shared/base-api.service';
import {Observable} from 'rxjs';
import {ICityInfo} from '../interfaces/cities.interface';
import {catchErrorLogEmpty} from '../../@core/shared/rxjs-operators/base-catch-error.operator';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient,
              private apiService: BaseApiService) { }

  getCities(text): Observable<ICityInfo[]> {
    if (text) {
      return this.apiService.get<ICityInfo[]>('autocomplete-search.json')
        .pipe(
          catchErrorLogEmpty()
        );
    }
  }
}
