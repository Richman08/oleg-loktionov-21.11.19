import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // tslint:disable-next-line:variable-name
  private _isLoading = new Subject<boolean>();
  public isLoading = this._isLoading.asObservable();

  show() {
  this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }

  constructor() {}
}

