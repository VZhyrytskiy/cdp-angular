import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RouterActions from './router.actions';

import { tap, map } from 'rxjs/operators';


@Injectable()
export class RouterEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.go),
        map(action => {
          const { path, queryParams, extras } = { ...action };
          return { path, queryParams, extras };
        }),
        tap(({ path, queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );
}