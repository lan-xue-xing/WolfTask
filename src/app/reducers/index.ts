import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from 'environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromQuote from './quote.reducer';
import * as fromAuth from './auth.reducer';
import { createSelector } from 'reselect';
import { Auth } from '../models';

export interface State {
    quote:      fromQuote.State;
    auth:       Auth;
};

export const initialState: State = {
    quote:      fromQuote.initialState,
    auth:       fromAuth.initialState
};

// 构建 Reducer 字典
const reducers = {
    quote: fromQuote.reducer
};

// 合并 Reducer 生产 + 开发
const productionReducers: ActionReducer<State> = combineReducers(reducers);
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any ): State {
    return environment.production ? productionReducers(state, action) : developmentReducers(state, action);
}

// 每日佳句
const getQuoteState = (state: State) => {if (state) {return state.quote}};
export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

// 认证
export const getAuthState = (state: State) => {if (state) {return state.auth}};
