import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // tslint:disable-next-line:variable-name
  private _isLoading = new Subject<boolean>();
  public isLoading = this._isLoading.asObservable();

  show(): void {
    this._isLoading.next(true);
  }

  hide(): void {
    this._isLoading.next(false);
  }
}
