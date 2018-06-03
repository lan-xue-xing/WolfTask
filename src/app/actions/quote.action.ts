import { Action } from '@ngrx/store';
import { Quote } from '../models';
import { type } from '../utils';

export const ActionTypes = {
    // 每日佳句
    FETCH_QUOTE:             type('[Quote] Fetch_Quote'),
    // 每日佳句_成功
    FETCH_QUOTE_SUCCESS:     type('[Quote] Fetch__Quote_Success'),
    // 每日佳句_失败
    FETCH_QUOTE_FAIL:        type('[Quote] Fetch__Quote_Fail')
};

// 每日佳句
export class FetchQuoteAction implements Action {
    readonly type = ActionTypes.FETCH_QUOTE;
    constructor(public payload: null) { }
}

// 每日佳句_成功
export class FetchQuoteSuccessAction implements Action {
    readonly type = ActionTypes.FETCH_QUOTE_SUCCESS;
    constructor(public payload: Quote) { }
}

// 每日佳句_失败
export class FetchQuoteFailAction implements Action {
    readonly type = ActionTypes.FETCH_QUOTE_FAIL;
    constructor(public payload: string) { }
}

export type Actions
    = FetchQuoteAction
    | FetchQuoteSuccessAction
    | FetchQuoteFailAction;
