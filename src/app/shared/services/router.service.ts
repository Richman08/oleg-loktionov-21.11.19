import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router,
              private  aRoute: ActivatedRoute) { }

  public removeQueryParams() {
    this.router.navigate(
      [],
      {
        relativeTo: this.aRoute,
        queryParams: {},
      });
  }
}
