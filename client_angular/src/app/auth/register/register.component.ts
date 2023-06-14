import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(4)]],
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation');
  }

  submit() {
    console.log('this.registerForm.value :>> ', this.registerForm.value);
    this.authService.register(this.registerForm.value);
  }

  passwordMismatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const passwordConfirmation = this.registerForm.get(
      'passwordConfirmation',
    )?.value;
    if (password !== '' && passwordConfirmation !== '') {
      return password !== passwordConfirmation;
    }
    return false;
  }
}
