import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';
import {IWeather} from '../../shared/interfaces/weather.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {

  favoriteCitiesWeather: IWeather[] = [];

  constructor(private weatherService: WeatherService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

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
          LocalizedName: citiesName[index],
          Key: citiesKeys[index]
        };
        this.favoriteCitiesWeather.push(cityWeather);
        this.cdr.detectChanges();
      });
    });
  }

  showCityWeather(id, name) {
    this.router.navigate(['/home'], {queryParams: {key: id, cityName: name}});
  }
}
