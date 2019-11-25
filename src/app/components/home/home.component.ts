import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CitiesService} from '../../shared/services/cities.service';
import {ICityInfo} from '../../shared/interfaces/cities.interface';
import {Observable} from 'rxjs';
import {debounceTime, filter, map, mergeMap, startWith} from 'rxjs/operators';
import {FavoriteService} from '../../shared/services/favorite.service';
import {IWeather} from '../../shared/interfaces/weather.interface';

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
  currentCityWeather: IWeather;
  isFavorite = new Observable<boolean>();

  constructor(private  fb: FormBuilder,
              private citiesService: CitiesService,
              private favService: FavoriteService,
              private cdr: ChangeDetectorRef) {
    this.isFavorite = this.favService.isFavorite$;
  }

  ngOnInit() {
    this.initSearchFormForm();
    this.initCitiesList();
    this.initDefaultCity();
    this.getDefaultCityWeather(this.defaultCityId);
    this.filteredCities();
  }

  initSearchFormForm() {
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

  getDefaultCityWeather(Key) {
    // this.defaultCity = this.citiesList.find((item) => item.LocalizedName === cityName);
    this.citiesService.getCurrentCityWeather().subscribe((currCity) => {
      console.log('currCity', currCity)
      this.defaultCityWeather = currCity[0];
      console.log(' this.defaultCityWeather',  this.defaultCityWeather);
      this.cdr.detectChanges();
    });
  }

  getCurrentCityWeather(cityName) {
    this.selectedCity = this.citiesList.find((item) => item.LocalizedName === cityName);
    this.citiesService.getCurrentCityWeather().subscribe((currCity) => {
      this.currentCityWeather = currCity[0];
      console.log('this.currentCityWeather', this.currentCityWeather);
      this.cdr.detectChanges();
    });
  }

  addToFavorite() {
    // this.favService.isFavorite();
  }
}
