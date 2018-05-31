import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Task, TaskList } from '../models';

@Injectable()
export class TaskService {

  // restful API
  private readonly domain = 'tasks';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  // 增
  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(task), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 删
  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .delete(uri)
      .mapTo(task);
  }

  // 改
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      desc:           task.desc,
      priority:       task.priority,
      dueDate:        task.dueDate,
      reminder:       task.reminder,
      ownerID:        task.ownerId,
      participantIds: task.participantIds,
      remark:         task.remark
    }
    return this.http
      .patch(uri, JSON.stringify(task), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 查
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'taskListId': taskListId}})
      .map((res: Response) => res.json() as Task[]);
  }

  // 项目下得所有任务
  getByList(lists: TaskList[]): Observable<Task[]> {
    return Observable
      .from(lists)
      .mergeMap((list: TaskList) => this.get(list.id))
      .reduce((tasks: Task[], task: Task[]) => [...tasks, ...task], []);
  }

  // 完成
  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      completed: task.completed
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 移动
  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    const toUpdate = {
      taskListId: taskListId
    }
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 移动全部
  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arrs, x) => [...arrs, x], [])

  }

}
