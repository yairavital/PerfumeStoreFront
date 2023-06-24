import { usersService } from 'src/app/Services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usersType } from 'src/app/usersType';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  usersList: any;
  userType: usersType;
  constructor(private usersServ: usersService, private route: Router) {
    this.getUsers();
  }
  deleteUser(user: any) {
    this.usersServ.deleteUser(user).subscribe((res) => {
      res ? alert('ok ') : alert('not ok');
      this.getUsers();
    });
  }
  updateUser(user: any) {
    localStorage.setItem('userToUpdate', JSON.stringify(user));
    this.route.navigate(['/editUser']);
  }
  getUsers() {
    this.usersServ.getUsers().subscribe((x) => {
      this.usersList = x;
    });
  }
  ngOnInit(): void {}
}
