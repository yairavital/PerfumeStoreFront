import { Component, OnInit } from '@angular/core';
import { usersService } from 'src/app/Services/users.service';
import { Iuser, User } from '../../IuserData';
import { usersType } from '../../usersType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userToUpdate: any;
  newUser: Iuser = {
    id: '',
    name: '',
    email: '',
    password: '',

    authLevel: usersType.user,
  };
  user: any;
  constructor(private usersServ: usersService, private router: Router) {
    this.user = localStorage.getItem('userToUpdate');
    this.user = JSON.parse(this.user);
  }
  updateUser(
    id: string,
    name: string,
    email: string,
    newPassword: string,
    userType: string
  ) {
    this.newUser = {
      id: id,
      name: name,
      email: email,
      password: newPassword,
      authLevel: usersType.user,
    };
    if (userType == 'admin') this.newUser.authLevel = usersType.admin;
    else this.newUser.authLevel = usersType.user;
    localStorage.setItem('userToUpdate', JSON.stringify(this.newUser));
    let user: User = {
      id: this.newUser.id,
      userName: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password,
      authLevel: this.newUser.authLevel,
    };
    this.usersServ.updateUser(user).subscribe((res) => {
      if (res) {
        alert('ok');
        this.router.navigate(['/manageUsers']);
      } else {
        alert('not ok');
      }
    });
  }
  ngOnInit(): void {}
}
