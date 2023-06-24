import { Component, OnInit } from '@angular/core';
import { usersService } from 'src/app/Services/users.service';
import { Iuser } from '../../IuserData';
import { usersType } from '../../usersType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  newUser = {
    password: '',
    email: '',
    userName: '',

    userType: usersType.user,
  };
  constructor(public usersServ: usersService, private route: Router) {}
  addUser(name: string, email: string, pass: string, userType: string) {
    this.newUser = {
      password: pass,
      email: email,
      userName: name,

      userType: usersType.user,
    };
    if (userType == '0') this.newUser.userType = usersType.admin;

    this.usersServ.addUser(this.newUser).subscribe((res) => {
      if (res) {
        alert('You add user Successfuly');
      }
    });

    this.route.navigate(['/manageUsers']);
  }
  ngOnInit(): void {}
}
