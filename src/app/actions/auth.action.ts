import { Action } from '@ngrx/store';
import { Auth, User } from '../models';
import { type } from '../utils';

export const ActionTypes = {
    // 登录
    LOGIN:             type('[Auth] Login'),
    // 登录成功
    LOGIN_SUCCESS:     type('[Auth] Login_Success'),
    // 登录失败
    LOGIN_FAIL:        type('[Auth] Login_Fail'),
    // 注册
    REGISTER:          type('[Auth] Register'),
    // 注册成功
    REGISTER_SUCCESS:  type('[Auth] Register_Success'),
    // 注册失败
    REGISTER_FAIL:     type('[Auth] Register_Fail'),
    // 退出
    LOGOUT:            type('[Auth] Logout')
};

// 登录
export class LoginAction implements Action {
    readonly type = ActionTypes.LOGIN;
    constructor(public payload: {email: string, password: string}) { }
}

// 登录成功
export class LoginSuccessAction implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: Auth) { }
}

// 登录失败
export class LoginFailAction implements Action {
    readonly type = ActionTypes.LOGIN_FAIL;
    constructor(public payload: string) { }
}

// 注册
export class RegisterAction implements Action {
    readonly type = ActionTypes.REGISTER;
    constructor(public payload: User) { }
}

// 注册成功
export class RegisterSuccessAction implements Action {
    readonly type = ActionTypes.REGISTER_SUCCESS;
    constructor(public payload: Auth) { }
}

// 注册失败
export class RegisterFailAction implements Action {
    readonly type = ActionTypes.REGISTER_FAIL;
    constructor(public payload: string) { }
}

// 退出
export class LogoutAction implements Action {
    readonly type = ActionTypes.LOGOUT;
    constructor(public payload: Auth) { }
}

export type Actions
    = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailAction
    | LogoutAction;
