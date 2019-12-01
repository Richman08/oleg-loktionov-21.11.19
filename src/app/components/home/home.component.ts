import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CitiesService} from '../../shared/services/cities.service';
import {ICityInfo} from '../../shared/interfaces/cities.interface';
import {from, Observable, of, Subject} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {FavoriteService} from '../../shared/services/favorite.service';
import {IWeather} from '../../shared/interfaces/weather.interface';
import {WeatherService} from '../../shared/services/weather.service';
import {IDailyForecast} from '../../shared/interfaces/daily-forecast';
import {formatDisplayedTimePipe} from '../../shared/pipes/displayed-time.rx-pipe';

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
  defaultCity: ICityInfo;
  selectedCity: ICityInfo;
  defaultCityWeather: IWeather;
  defaultCityId = '215854';
  dailyForecast: IDailyForecast[] = [];
  currentCityWeather: IWeather;
  isFavorite: boolean;

  constructor(private  fb: FormBuilder,
              private citiesService: CitiesService,
              private weatherService: WeatherService,
              private favService: FavoriteService,
              private cdr: ChangeDetectorRef) {
    // this.isFavorite = this.favService.isFavorite$;
  }

  ngOnInit() {
    this.initSearchForm();
    this.initCitiesList();
    this.initDefaultCity();
    this.getDefaultCityWeather(this.defaultCityId);
    this.initDailyForecast();
    this.filteredCities();
    this.checkIsFavorite();
    this.favService.isFavorite$.subscribe(item => this.isFavorite = item);
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      citySearch: ['']
    });
  }

  private initDefaultCity() {
    this.citiesService.getCities()
      .subscribe((citiesList: ICityInfo[]) => {
        this.defaultCity = citiesList.find((item) => item.Key === '215854');
        this.cdr.detectChanges();
        console.log('this.defaultCity', this.defaultCity);
      });
  }

  private initCitiesList() {
    this.citiesService.getCities()
      .subscribe((citiesList: ICityInfo[]) => {
        this.citiesList = citiesList;
      });
  }

  private filteredCities() {
    this.citiesList$ = this.searchForm.get('citySearch')
      .valueChanges
      .pipe(
        debounceTime(500),
        startWith(null),
        map((item: string | null) => {
          return item ? this._filterCities(item).sort() : this.citiesList.slice();
        })
      );
    this.cdr.detectChanges();
  }

  private _filterCities(value: string): any[] {
    const filterValue = value.toLocaleLowerCase();
    return this.citiesList.filter(city => city.LocalizedName.toLowerCase().indexOf(filterValue) === 0);
  }

  private getDefaultCityWeather(Key) {
    this.weatherService.getDefaultCityWeather().subscribe((defaultCity) => {
      this.defaultCityWeather = defaultCity[0];
      console.log(' this.defaultCityWeather', this.defaultCityWeather);
      this.cdr.detectChanges();
    });
  }

  private getCurrentCityWeather(cityName) {
    this.selectedCity = this.citiesList.find((item) => item.LocalizedName === cityName);
    this.weatherService.getCityWeather().subscribe((currCity) => {
      this.currentCityWeather = currCity[0];
      console.log('this.currentCityWeather', this.currentCityWeather);
      this.cdr.detectChanges();
    });
  }

  private initDailyForecast() {
    this.weatherService.getDailyForecast()
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

  private checkIsFavorite() {
    console.log('this.isFavorite', this.isFavorite);
    // this.favService.getIsFavorite();
    // (localStorage.getItem(cityName) === null) ? this.favService.setIsFavorite() : null;
  }

  private addToFavorite() {
    this.favService.setIsFavorite();
    console.log('this.isFavorite', this.isFavorite);
    if (this.selectedCity) {
      localStorage.setItem(this.selectedCity.LocalizedName, this.selectedCity.Key);

    } else {
      localStorage.setItem(this.defaultCity.LocalizedName, this.defaultCity.Key);
    }
  }

  private removeFromFavorite() {
    this.favService.setIsFavorite();
    console.log('this.isFavorite', this.isFavorite);
    if (this.selectedCity) {
      localStorage.removeItem(this.selectedCity.LocalizedName);
    } else {
      localStorage.removeItem(this.defaultCity.LocalizedName);
    }
  }
}
