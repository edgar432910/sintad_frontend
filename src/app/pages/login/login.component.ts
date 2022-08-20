import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_service/login.service';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!:FormGroup;


  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // localStorage.removeItem('environment.TOKEN_NAME'); 
    // localStorage.removeItem('token');
    this.loadForm();

  }
  loadForm(){
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(20)])
    })
  }
  login(){

    const {email,password} = this.formGroup.value;
    console.log(email,password);
    

      this.loginService.login(email, password).subscribe(data => {
    
      // console.log(data);
      localStorage.setItem(environment.TOKEN_NAME, data.access_token);    
      this.router.navigate(['/pages/entidad']);
    });
  }
  

  get email(){
    return this.formGroup.get('email');
  }

  get password(){
    return this.formGroup.get('password');
  }
  validateForm(){
    // this.formGroup.markAllAsTouched();
    this.formGroup.get('password')?.markAsTouched();
    this.formGroup.updateValueAndValidity();
  }
  

}
