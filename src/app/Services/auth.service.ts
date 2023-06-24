import { usersService } from 'src/app/Services/users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../IuserData';

@Injectable()
export class AuthService {
  user!: User;
  loggedInUser?: User;

  constructor(private http: HttpClient, private usersService: usersService) {}

  logIn(email: string, password: string) {
    let tempUser = {
      password: password,
      email: email,
    };

    return this.http.post('http://localhost:5233/api/auth/login', tempUser);
  }

  getUser(id: string) {
    return this.http.get('http://localhost:5233/api/Auth/getUser/' + id);
  }

  refreshToken() {
    return this.http.post(
      'http://localhost:5233/api/Auth/verfiyRefreshtoken/',
      {
        token: localStorage.getItem('Token'),
        refreshToken: localStorage.getItem('RefreshToken'),
        id: localStorage.getItem('ID'),
      }
    );
  }
}
