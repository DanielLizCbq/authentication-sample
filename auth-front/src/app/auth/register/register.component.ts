import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = this.fb.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      mobilephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.matchingPasswords }
  );

  states = ['MG', 'SP', 'RJ', 'RS', 'SC', 'GO', 'PR'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  matchingPasswords(group: FormGroup): { matching: boolean } {
    if (group) {
      const password1 = group.get('password1').value;
      const password2 = group.get('password2').value;
      if (password1 === password2) {
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit() {
    // console.log(this.formRegister.value);
    let u: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1,
    };
    this.authService.register(u).subscribe(
      (u) => {
        console.log(u);
        this.snackBar.open(
          `Successfuly registered, ${u.firstname}. Use your credentials to sign in`,
          'OK',
          { duration: 2000 }
        );
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        this.snackBar.open(err.error.message, 'OK', { duration: 2000 });
      }
    );
  }
}
