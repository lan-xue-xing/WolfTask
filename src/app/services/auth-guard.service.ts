import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../models';
import * as FormReducer from '../reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store$
      .select(FormReducer.getAuthState)
      .map((auth: Auth) => {
        const result = auth.token !== null && auth.token !== undefined;
        if (result) {
          this.store$.dispatch(go(['/login']));
        }
        return result;
      })
  }
  constructor(
    private store$: Store<FormReducer.State>
  ) { }

}
