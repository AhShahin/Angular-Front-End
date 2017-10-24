import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PaginatedModel} from '../models/paginatedModel';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  users$: Observable<PaginatedModel> = this.service.usersSubj;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.users$ = this.service.usersSubj;
  }

  navByUrl(page_url) {
    this.service.getUsersAtUrl(page_url);
  }
}
