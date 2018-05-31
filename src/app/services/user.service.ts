import { Inject, Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Project, User } from '../models';

@Injectable()
export class UserService {

  // restful API
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: Http,
    @Inject('BASE_CONFIG') private config
  ) { }

  // 搜索建议
  searchUsers(filter: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'users_like': filter}})
      .map((res: Response) => res.json() as User[]);
  }

  // 用户组
  getUsersByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}})
      .map((res: Response) => res.json() as User[]);
  }

  // 增
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
      .map((res: Response) => res.json() as User);
  }

  // 删
  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    this.http
      .patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers})
      .map((res: Response) => res.json() as User);
  }

  // 改
  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.of(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map((res: Response) => res.json() as User)
      })
      .filter((user: User) => user.projectIds.indexOf(projectId) === -1)
      .switchMap((u: User) => this.addProjectRef(u, projectId))
      .reduce((arrs, curr) => [...arrs, curr], []);
  }

}
