import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from './../models/quote.model';

@Injectable()
export class QuoteService {

  // uri
  uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;


  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config: {uri: string}
  ) { }

  // 获取佳句
  getQuote(): Observable<Quote> {
    return this.http.get(this.uri)
      .debug('Quote')
      .map((res: Response) => res.json() as Quote);
  }

}
