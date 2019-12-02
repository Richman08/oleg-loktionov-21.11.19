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

  private favoriteCities = Object.keys({...localStorage});
  private favoriteCitiesWeather: IWeather[] = [];

  constructor(private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getFavoriteCitiesWeather();
  }

  private getFavoriteCitiesWeather() {
    const citiesKeys = Object.values({...localStorage});
    citiesKeys.forEach(cityKeys => {
      this.weatherService.getCityWeather(cityKeys).subscribe((weather: IWeather) => {
        console.log('city', weather[0]);
        this.favoriteCitiesWeather.push(weather[0]);
        console.log('this.favoriteCitiesWeather', this.favoriteCitiesWeather);
        this.cdr.detectChanges();
      });
    });
    console.log('favoriteCities', this.favoriteCities);
  }


}
