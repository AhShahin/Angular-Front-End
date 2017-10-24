import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {
  @Input() userRegistered: User;
  constructor() { }

  ngOnInit() {
    console.log(this.userRegistered);
  }

}
