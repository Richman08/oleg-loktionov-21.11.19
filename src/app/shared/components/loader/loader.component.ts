import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from 'rxjs';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  mode = 'indeterminate';
  isLoading = new Observable<boolean>();
  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit() {
  }
}
