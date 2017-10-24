import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Province} from '../models/province';
import {User} from '../models/user';
import {PaginatedModel} from '../models/paginatedModel';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  usersSubj: BehaviorSubject<PaginatedModel> = new BehaviorSubject<PaginatedModel>(null);
  users$ = this.usersSubj.asObservable();
  editUserSubj: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: Http) { }
  getProvinces(): Observable<Province[]> {
    return this.http.get('http://127.0.0.1:8000/provinces')
      .map(res => res.json());
  }
  registerUser(user: User): Observable<User> {
    return this.http.post('http://127.0.0.1:8000/users', user)
      .map(res => res.json());
  }
  getUsers() {
    return this.http.get('http://127.0.0.1:8000/users')
      .map(res => res.json()).
      subscribe(users => this.usersSubj.next(users),
        err => console.log(err));
  }
  getUsersAtUrl(url: string) {
    return this.http.get(url)
      .map(res => res.json()).
      subscribe(users => this.usersSubj.next(users),
        err => console.log(err));
  }
  updateUser(user: User) {
    this.editUserSubj.next(null);
    return this.http.patch('http://127.0.0.1:8000/users/' + user.id, user)
      .map(res => res.json());
  }
  deleteUser(user: User, currPage) {
    return this.http.delete('http://127.0.0.1:8000/users/' + user.id)
      .map(res => res.json()).
      subscribe(data => this.getUsersAtUrl('http://127.0.0.1:8000/users?page=' + currPage),
        err => console.log(err));
  }
}


