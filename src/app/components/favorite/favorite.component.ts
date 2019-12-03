import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';
import {IWeather} from '../../shared/interfaces/weather.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {

  favoriteCities = Object.keys({...localStorage});
  favoriteCitiesWeather: IWeather[] = [];

  constructor(private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getFavoriteCitiesWeather();
  }

  private getFavoriteCitiesWeather() {
    const citiesKeys = Object.values({...localStorage});
    const citiesName = Object.keys({...localStorage});
    citiesKeys.forEach((cityKeys, index) => {
      this.weatherService.getCityWeather(cityKeys).subscribe((weather: IWeather) => {
        const cityWeather = {
          ...weather[0],
          LocalizedName: citiesName[index]
        };
        this.favoriteCitiesWeather.push(cityWeather);
        this.cdr.detectChanges();
      });
    });
  }
}
