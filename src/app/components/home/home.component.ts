import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CitiesService} from '../../shared/services/cities.service';
import {ICityInfo} from '../../shared/interfaces/cities.interface';
import {Observable} from 'rxjs';
import {debounceTime, filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  searchForm!: FormGroup;
  citiesList$: Observable<ICityInfo[]>;
  citiesList: ICityInfo[];

  constructor(private  fb: FormBuilder,
              private citiesService: CitiesService) { }


  ngOnInit() {
    this.initSearchFormForm();
    this.getCitiesList();
    this.citiesList$.subscribe(list => {
      this.citiesList = list;
      console.log('this.citiesList', this.citiesList);
    });
  }

  initSearchFormForm() {
    this.searchForm = this.fb.group({
      citySearch: ['']
    });
  }

  getCitiesList() {
    this.citiesList$ = this.searchForm.get('citySearch').valueChanges
      .pipe(
        filter(item => item !== ''),
        debounceTime(500),
        filter(text => this.citiesList ? !this.citiesList.find(city => city.LocalizedName === text) : true),
        mergeMap(value => this.citiesService.getCities(value))
      );
  }
}
