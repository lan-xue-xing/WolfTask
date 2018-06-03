import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as FormAction from '../actions/quote.action';
import { Quote } from './../models';
import { QuoteService } from './../services/quote.service';

@Injectable()
export class QuoteEffects {
    // 每日佳句
    @Effect()
    quote$: Observable<Action> = this.actions$
        .ofType(FormAction.ActionTypes.FETCH_QUOTE)
        .map(toPayload)
        .switchMap(_ => this.service$.getQuote()
            .map((quote: Quote) => new FormAction.FetchQuoteSuccessAction(quote))
            .catch(error => Observable.of(new FormAction.FetchQuoteFailAction(JSON.stringify(error))))
        );

    constructor(
        private actions$: Actions,
        private service$: QuoteService
    ) {}
}
