import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  invalidLogin: boolean;

  constructor(private router: Router, private loginService: LoginService) {
  }

  login(form: NgForm) {
    this.loginService.login(form.value).subscribe(response => {
        const token = (<any>response).token;
        const menuList = (<any>response).menuList;
        localStorage.setItem('jwt', token);
        localStorage.setItem('menuList', JSON.stringify(menuList));
        this.invalidLogin = false;
        this.router.navigate(['/dashboard']);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
