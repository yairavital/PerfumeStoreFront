import { Iuser } from './../../IuserData';
import { Component, OnInit } from '@angular/core';
import { usersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usersList: Iuser[];
  isLogin: boolean = false;

  constructor(
    private usersService: usersService,
    private auth: AuthService,
    public router: Router
  ) {
    this.usersService
      .getUsers()
      .subscribe((x: Iuser[]) => (this.usersList = x));
  }
  Login(userName: string, password: string) {
    this.auth.logIn(userName, password).subscribe((item: any) => {
      localStorage.setItem('ID', item['id']);
      localStorage.setItem('Token', item['token']);
      localStorage.setItem('RefreshToken', item['refreshToken']);
      this.isLogin = true;
      localStorage.setItem('login', 'true');

      localStorage.setItem('userLoggedIn', JSON.stringify(userName));
    });
    this.router.navigate(['/']);
  }
  ngOnInit(): void {}
}
