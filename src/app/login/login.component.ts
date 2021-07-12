import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  refreshedDone: boolean;
  loginForm: FormGroup;
  msgError: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('refreshed')) {
      localStorage.setItem('refreshed','true')
      window.location.reload(true);
  } else {
      this.refreshedDone = true;
      localStorage.removeItem('refreshed');
      this.loginForm = this.createLoginForm();
  }
  }
  createLoginForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  doDashboard(){
   console.log(this.loginForm.value);
   let login = this.loginForm.value;
   if((login.email == 'admin')&&(login.password=='admin'))
  { this.msgError =null;
  this.route.navigateByUrl('/dashboard');}
  else 
  this.msgError = "plz verify your information"
  }
}
