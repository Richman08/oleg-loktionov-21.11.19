import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  // tslint:disable-next-line:variable-name
  private _isFavorite = new BehaviorSubject<boolean>(false);
  public isFavorite$ = this._isFavorite.asObservable();

  get isFavorite(): boolean {
    return this._isFavorite.getValue();
  }

  set isFavorite(val: boolean) {
    this._isFavorite.next(val);
  }
}
