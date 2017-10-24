import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../models/user';
import {Province} from '../models/province';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import {assign} from "rxjs/util/assign";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-register',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  user: User;
  provinces: Province[];
  setProvncErrMsg$: Observable<boolean> = Observable.of(false);
  setQcErrMsg$: Observable<boolean> = Observable.of(false);
  setFedErrMsg$: Observable<boolean> = Observable.of(false);
  selectedProvince: string;
  registeredUser: User;
  editUser: User;
  constructor(private ser: UserService) {}
  ngOnInit() {
    this.ser.getProvinces().subscribe(
      provinces => {
        this.provinces = provinces;
        },
      err => console.log(err)
    );
    this.editUser = this.ser.editUserSubj.getValue();
    if (this.editUser) {
      this.user = {
        id: this.editUser.id,
        name: this.editUser.name,
        postal_code: this.editUser.postal_code,
        telephone: this.editUser.telephone,
        salary: this.editUser.salary,
        province_id: this.editUser.province_id
      };
      this.user['notNew'] = true;
      console.log(this.user);
    }else {
      this.user = {
        name: '',
        postal_code: '',
        telephone: '',
        salary: '',
        province_id: ''
      };
    }
  }
  onChange(value) {
    for (const key in this.provinces) {
      if (this.provinces[key].id === +this.user.province_id) {
        this.selectedProvince = this.provinces[key].name;
      }
    }
    this.setProvncErrMsg$ = Observable.of(false);
    this.setQcErrMsg$ = Observable.of(false);
    this.setFedErrMsg$ = Observable.of(false);
    this.user.salary = null;
  }
  validateSalary(regForm: NgForm) {
    if (!this.user.province_id) {
      this.setProvncErrMsg$ = Observable.of(true);
      regForm.controls['salary'].setErrors({'incorrect': true});
    } else {
      setTimeout(() => {
        let patt = /^(\d{2}\s\d{3})(,\d{2})?$/;
        if (this.selectedProvince === 'Québec' && !patt.test(this.user.salary.toString())) {
          regForm.controls['salary'].setErrors({'incorrect': true});
          this.setQcErrMsg$ = Observable.of(true);
        } else {
          this.setQcErrMsg$ = Observable.of(false);
        }
        patt = /^(\d{5})$|^(\d{2}(\,?\d{3}).\d{2})$/;
        if (this.selectedProvince !== 'Québec' && !patt.test(this.user.salary.toString())) {
          regForm.controls['salary'].setErrors({'incorrect': true});
          this.setFedErrMsg$ = Observable.of(true);
        } else {
          this.setFedErrMsg$ = Observable.of(false);
        }
      }, 1000);
    }
  }
  save(regForm: NgForm) {
    if (this.user.hasOwnProperty('notNew')) {
      this.ser.updateUser(this.user).subscribe(
        user => this.registeredUser = user,
        err => console.error(err)
      );
    }else {
      this.ser.registerUser(this.user).subscribe(
        data => { this.registeredUser = data;
        },
        err => console.error(err)
      );
    }
  }
}
