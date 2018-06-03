import * as FormQuoteAction from '../actions/quote.action';
import { Quote } from '../models';

export interface State {
    quote: Quote;
};

export const initialState: State = {
    quote: {
        id: '0',
        cn: '人生并不像火车要通过每个站似的经过每一个生活阶段。人生总是直向前行走，从不留下什么。',
        en: 'Life is not like a train going through every station like every stage of life' +
            'Life is always moving forward without leaving anything behind.',
        pic: '/assets/img/quote_fallback.jpg'
    }
};

export function reducer(state = initialState, action: FormQuoteAction.Actions): State {
    switch (action.type) {
        case FormQuoteAction.ActionTypes.FETCH_QUOTE_SUCCESS: {
            return {
                ...state,
                quote: <Quote>action.payload
            };
        }
        case FormQuoteAction.ActionTypes.FETCH_QUOTE_FAIL:
        default: {
            return state;
        }
    }
}

export const getQuote = (state: State) => {if (state) {return state.quote}};
