import { Component } from '@angular/core';
import {LoaderService} from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading
      .subscribe((state) => {
        requestAnimationFrame(() => {
          this.isLoading = state;
        });
      });
  }
}
