import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {State} from '../../store';
import {select, Store} from '@ngrx/store';
import {isLoggedIn} from '../../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthUser: boolean;

  constructor(private store: Store<State>) {
    this.store
      .pipe(select(isLoggedIn))
      .subscribe(loggedIn => this.isAuthUser = loggedIn)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isAuthUser;
  }

}
