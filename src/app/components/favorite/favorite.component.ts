import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {

  favoriteCities: [];

  constructor(private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getFavoriteCities();
  }

  getFavoriteCities() {
    const citiesKeys = Object.values({...localStorage});
    this.weatherService.getCityWeather();
    console.log(citiesKeys);
    // this.favoriteCities = citiesKeys;
  }

}
