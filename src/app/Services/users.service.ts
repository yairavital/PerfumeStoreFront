import { Iuser, User } from './../IuserData';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class usersService {
  adminLoggedIn: boolean = false;
  userLog: any;
  usersFromLocal: any;
  isExist: boolean = false;
  index: number = 0;
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject(
    this.checkLoginFromLocal()
  );
  checkLogin: any;
  loginFromLocal: any;

  usersList: Iuser[] = [];

  constructor(public router: Router, private http: HttpClient) {
    this.getUsers().subscribe((x: Iuser[]) => (this.usersList = x));
    this.isLogin.subscribe((log) => {
      localStorage.setItem('login', JSON.stringify(log));
    });
  }

  deleteUser(user: any) {
    return this.http.delete(
      `http://localhost:5233/api/Auth/deleteUser/${user.id}`
    );
  }

  getUsers() {
    return this.http.get('http://localhost:5233/api/Auth/getUsers');
  }
  addUser(user: any) {
    return this.http.post('http://localhost:5233/api/Auth/register', user);
  }
  updateUser(user: User) {
    return this.http.put('http://localhost:5233/api/Auth/updateUser', user);
  }
  login(userName: string, password: string): boolean {
    this.getUsers().subscribe((x: Iuser[]) => (this.usersList = x));
    this.usersList.forEach((us) => {
      if (us.name == userName && us.password == password) {
        this.isLogin.next(true);
        this.SaveUserLogin(userName);
      }
    });

    this.checkLogin = this.checkLoginFromLocal();
    if (this.checkLogin == false)
      alert('The username or password is incorrect');
    return this.checkLogin;
  }
  logOut(): boolean {
    this.isLogin.next(false);

    this.checkLogin = this.checkLoginFromLocal();
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/home']);
    return this.checkLogin;
  }
  checkLoginFromLocal(): boolean {
    this.loginFromLocal = localStorage.getItem('login');
    this.checkLogin = JSON.parse(this.loginFromLocal);
    return this.checkLogin;
  }
  SaveUserLogin(user: any) {
    localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }
  ReturnUserLogin() {
    this.userLog = localStorage.getItem('userLoggedIn');
    return JSON.parse(this.userLog);
  }
  checkAdminLogin(): boolean {
    this.adminLoggedIn =
      this.checkLoginFromLocal() && this.ReturnUserLogin() == 'admin@email.com';
    return this.adminLoggedIn;
  }
}
