import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskList } from '../models';

@Injectable()
export class TaskListService {

  // restful API
  private readonly domain = 'taskLists';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  // 增
  add(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(taskList), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 删
  delete(taskList: TaskList): Observable<TaskList> {
    const delTasks$ = Observable.from(taskList.taskIds)
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return delTasks$
      .switchMap(_ => this.http.delete(uri))
      .mapTo(taskList);
  }

  // 改
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name:       taskList.name
    }
    return this.http
      .patch(uri, JSON.stringify(taskList), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 查
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}})
      .map((res: Response) => res.json() as TaskList[]);
  }

  // 交换
  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri =  `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http
      .patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers})
      .map((res: Response) => res.json());
    const drop$ = this.http
      .patch(dropUri, JSON.stringify({order: src.order}))
      .map((res: Response) => res.json());
    return Observable
      .concat(drag$, drop$)
      .reduce((arrs, list) => [...arrs, list], []);
  }

}
