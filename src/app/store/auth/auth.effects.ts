import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../auth/auth.service';

import * as AuthActions from './auth.actions';



@Injectable()
export class AuthEffects implements OnInitEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authInit),
    mergeMap(() => {
      return this.authService.identify()
        .pipe(
          map(response => {
            this.router.navigate(['welcome']);
            return AuthActions.loginSuccess({data: response.data});
          }),
          catchError((error) => {
            this.router.navigate(['/login']);
            return of(AuthActions.loginFailure({error}));
          })
        );
    })
    )
  );

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    mergeMap((action) => this.authService.login(action.data)
      .pipe(
        map(response => {
          if (response.token != null) {
            localStorage.setItem('token', response.token);
          };
          this.router.navigate(['/welcome']).then();
          this.toastrService.success('You are successfully logged in!', 'Login');
          return AuthActions.loginSuccess({data: response.data});
        }),
        catchError((error) => {
          this.toastrService.error('Wrong email or password', 'Login');
          return of(AuthActions.loginFailure({error}));
        })
      ))
    )
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.register),
    mergeMap((action) => this.authService.register(action.data)
      .pipe(
        map(response => {
          if(response.token != null){
            localStorage.setItem('token', response.token);
          }
          this.router.navigate(['/welcome']).then();
          return AuthActions.registerSuccess({data: response.data});
        }),
        catchError((error) => of(AuthActions.registerFailure({error})))
      ))
    )
  );


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    mergeMap(() => this.authService.logout()
      .pipe(
        map(() => {
          // localStorage.removeItem('token');
          return AuthActions.logoutSuccess();
        }),
        catchError(() => {
          // localStorage.removeItem('token');
          return of(AuthActions.logoutSuccess());
        })
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService) {

  }
  ngrxOnInitEffects(): Action {
    return AuthActions.authInit();
  }
}
