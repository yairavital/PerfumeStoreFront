import { usersService } from 'src/app/Services//users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usersType } from 'src/app/usersType';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  constructor(private usersServ: usersService, private route: Router) {}

  ngOnInit(): void {}
  isRegistered: boolean = false;
  newUser = {
    password: '',
    email: '',
    userName: '',

    authLevel: usersType.user,
  };
  form = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get userName() {
    return this.form.get('userName');
  }
  get password() {
    return this.form.get('password');
  }
  get email() {
    return this.form.get('email');
  }

  get repeatPassword() {
    return this.form.get('repeatPassword');
  }

  Submit() {
    if (this.form.valid && this.repeatPassword.value === this.password.value) {
      this.newUser = {
        userName: this.userName.value,
        password: this.password.value,
        email: this.email.value,

        authLevel: usersType.user,
      };
      this.usersServ.addUser(this.newUser).subscribe((res) => {
        if (res) {
          alert('You add user Successfuly');
          this.usersServ.SaveUserLogin(this.newUser);
          this.isRegistered = true;
          this.usersServ.isLogin.next(true);
        } else {
          alert('Failed ');
        }
      });

      this.route.navigate(['/home']);
    } else {
      alert('Failed ');
    }
  }
}
