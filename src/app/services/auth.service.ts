import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Auth, User } from '../models';

@Injectable()
export class AuthService {

  // restful API
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5' +
    'NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc';

  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  // 注册
  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap((res: Response) => {
        if (res.json().length > 0) {
          throw new Error('用户已经存在！');
        }
        return this.http
          .post(uri, JSON.stringify(user), {headers: this.headers})
          .map((response: Response) => ({token: this.token, user: response.json()}));
      })
  }

  // 登录
  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'username': username, 'password': password}})
      .map((res: Response) => {
        if (res.json().length === 0) {
          throw new Error('用户名或者密码错误!');
        }
        return {
          token: this.token,
          user: res.json()[0]
        }
      });
  }

}
