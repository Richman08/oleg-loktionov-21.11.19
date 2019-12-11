import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Self} from '@angular/core';
import {WeatherService} from '../../shared/services/weather.service';
import {IWeather} from '../../shared/interfaces/weather.interface';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {NgOnDestroy} from '../../@core/shared/services/destroy.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgOnDestroy]
})
export class FavoriteComponent implements OnInit {

  favoriteCitiesWeather: IWeather[] = [];

  constructor(private weatherService: WeatherService,
              private router: Router,
              private cdr: ChangeDetectorRef,
              @Self() private ngOnDestroy$: NgOnDestroy) {
  }

  ngOnInit(): void {
    this.getFavoriteCitiesWeather();
  }

  private getFavoriteCitiesWeather() {
    const citiesKeys = Object.values({...localStorage});
    const citiesName = Object.keys({...localStorage});
    citiesKeys.forEach((cityKeys, index) => {
      this.weatherService.getCityWeather(cityKeys)
        .pipe(
          takeUntil(this.ngOnDestroy$)
        )
        .subscribe((weather: IWeather) => {
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

  showCityWeather(id, name): void {
    this.router.navigate(['/home'], {queryParams: {key: id, cityName: name}});
  }
}
