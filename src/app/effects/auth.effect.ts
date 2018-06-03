import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { go } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as FormAction from '../actions/auth.action';
import { Auth, User } from './../models';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthEffects {
    // 登录
    @Effect()
    auth$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(({email, password}) => this.service$.login(email, password)
            .map((auth: Auth) => new FormAction.LoginSuccessAction(auth))
            .catch(error => Observable.of(new FormAction.LoginFailAction(JSON.stringify(error))))
        );

    // 注册
    @Effect()
    register$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.REGISTER)
        .map(toPayload)
        .switchMap((user: User) => this.service$.register(user)
            .map((auth: Auth) => new FormAction.RegisterSuccessAction(auth))
            .catch(error => Observable.of(new FormAction.RegisterFailAction(JSON.stringify(error))))
        );

    // 退出
    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.REGISTER)
        .map(toPayload)
        .map(_ => go(['/login']));

    // 登录成功
    @Effect()
    logoutSuccess$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.LOGIN_SUCCESS)
        .map(toPayload)
        .map(_ => go(['/projects']));

    // 注册成功
    @Effect()
    registerSuccess$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.REGISTER_SUCCESS)
        .map(toPayload)
        .map(_ => go(['/']));

    constructor(
        private actions$: Actions,
        private service$: AuthService
    ) {}
}
