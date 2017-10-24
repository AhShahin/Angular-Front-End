import { Component, OnInit } from '@angular/core';
import {PaginatedModel} from '../models/paginatedModel';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  users$: Observable<PaginatedModel> = this.service.users$;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.getUsers();
  }
  editUserPage(user: User) {
    this.service.editUserSubj.next(user);
    this.router.navigate(['/registration']);
  }
  deleteUser(user: User) {
    const users = this.service.usersSubj.getValue();
    this.service.deleteUser(user, users.current_page);
  }
}
