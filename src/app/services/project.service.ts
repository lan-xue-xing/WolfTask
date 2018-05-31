import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models';

@Injectable()
export class ProjectService {

  // restful API
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  // 增
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 删
  delete(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskLists ? project.taskLists : [])
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

  // 改
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name:       project,
      desc:       project.desc,
      coverImg:   project.coverImg
    }
    return this.http
      .patch(uri, JSON.stringify(project), {headers: this.headers})
      .map((res: Response) => res.json());
  }

  // 查
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_like': userId}})
      .map((res: Response) => res.json() as Project[]);
  }

}
