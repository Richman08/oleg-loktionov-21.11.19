import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CitiesService} from '../../shared/services/cities.service';
import {ICityInfo} from '../../shared/interfaces/cities.interface';
import {Observable, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {IWeather} from '../../shared/interfaces/weather.interface';
import {WeatherService} from '../../shared/services/weather.service';
import {IDailyForecast} from '../../shared/interfaces/daily-forecast';
import {formatDisplayedTimePipe} from '../../shared/pipes/displayed-time.rx-pipe';
import {ThirdPartyApi} from '../../shared/enums/third-party-api.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  searchForm!: FormGroup;
  citiesList$: Observable<any[]>;
  citiesList: ICityInfo[] = [];
  selectedCity: ICityInfo;
  defaultCityWeather: IWeather;
  defaultCityId = '215854';
  dailyForecast: IDailyForecast[] = [];
  currentCityWeather: IWeather;
  isFavorite: boolean;
  selectedCity$: Subject<ICityInfo> = new Subject<ICityInfo>();
  apiUrl = ThirdPartyApi.WEATHER_ICONS;

  constructor(private fb: FormBuilder,
              private citiesService: CitiesService,
              private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initSearchForm();
    this.initCitiesList();
    this.initDefaultCity();
    this.getDefaultCityWeather(this.defaultCityId);
    this.initDailyForecast();
    this.filteredCities();
    this.selectedCity$.subscribe(city => {
      this.selectedCity = city;
      this.cdr.detectChanges();
      this.findFavoriteCities(city) ? this.isFavorite = true : this.isFavorite = false;
    });

  }

  findFavoriteCities(city) {
    const favoriteCitiesList = Object.values({...localStorage});
    return favoriteCitiesList.find(item => item === city.Key);
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      citySearch: ['']
    });
  }

  private initDefaultCity() {
    this.citiesService.getCities(this.defaultCityId)
      .subscribe((citiesList: ICityInfo[]) => {
        const defaultCity = citiesList.find((item) => item.Key === '215854');
        this.selectedCity$.next(defaultCity);
        this.cdr.detectChanges();
      });
  }

  private initCitiesList() {
    this.citiesService.getCities('telaviv')
      .subscribe((citiesList: ICityInfo[]) => {
        this.citiesList = citiesList;
        console.log('this.citiesList', this.citiesList);
        console.log('citiesList', citiesList);
      });
  }

  private filteredCities() {
    this.citiesList$ = this.searchForm.get('citySearch')
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(null),
        map((item: string | null) => {
          console.log('item', item);
          return item ? this._filterCities(item).sort() : this.citiesList.slice();
        })
      );
    this.cdr.detectChanges();
  }

  private _filterCities(value: string): any[] {
    const filterValue = value.toLocaleLowerCase();
    return this.citiesList.filter(city => city.LocalizedName.toLowerCase().indexOf(filterValue) === 0);
  }

  private getDefaultCityWeather(key) {
    this.weatherService.getDefaultCityWeather(key).subscribe((defaultCity) => {
      this.defaultCityWeather = defaultCity[0];
      console.log(' this.defaultCityWeather', this.defaultCityWeather);
      this.cdr.detectChanges();
    });
  }

  private getCurrentCityWeather(cityName) {
    const selectedCity = this.citiesList.find((item) => item.LocalizedName === cityName);
    this.selectedCity$.next(selectedCity);
    this.weatherService.getCityWeather(selectedCity.Key).subscribe((currCity) => {
      this.currentCityWeather = currCity[0];
      console.log('this.currentCityWeather', this.currentCityWeather);
      this.cdr.detectChanges();
    });
  }

  private initDailyForecast() {
    this.weatherService.getDailyForecast(this.defaultCityId || this.selectedCity.Key)
      .pipe(
        switchMap((data) => of(data[0].DailyForecasts)
          .pipe(
            formatDisplayedTimePipe('Date', 'displayedDate')
          ))
      )
      .subscribe((dailyForecasts) => {
        this.dailyForecast = dailyForecasts;
        this.cdr.detectChanges();
      });
  }

  private addToFavorite() {
    console.log('this.isFavorite', this.isFavorite);
    if (this.selectedCity) {
      localStorage.setItem(this.selectedCity.LocalizedName, this.selectedCity.Key);
      this.isFavorite = true;
    }
  }

  private removeFromFavorite() {
    console.log('this.isFavorite', this.isFavorite);
    if (this.selectedCity) {
      this.isFavorite = false;
      localStorage.removeItem(this.selectedCity.LocalizedName);
    }
  }


}
