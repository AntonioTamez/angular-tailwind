import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgIf, ButtonComponent, NgClass],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  token: string = "";

  constructor(
    private readonly _formBuilder: FormBuilder, 
    private readonly _router: Router, 
    private readonly authService: AuthService
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required,  Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;

    console.log(email, '==0===',password)
    // stop here if form is invalid

    console.log(this.form.valid)

    if (this.form.invalid) {
      return;
    }

    this.authService.getToken(email, password).subscribe(
      token => {       
        
        console.log('entro en sign-in')
        this.token = token;
        localStorage.setItem('token', token); 

        const decodedToken = this.decodeToken(token);

        const username = decodedToken.username; 
        const userRole = decodedToken.role; 
        const name = decodedToken.name; 

        console.log("el rol es: ", userRole);
        console.log("el name es: ", name);
        console.log("el username es: ", username);
        console.log("el token es: ", this.token);
         
        this._router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error al obtener el token', error);
      }
    )


    this._router.navigate(['/']);
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); 
    return JSON.parse(decodedPayload);
  }

}
