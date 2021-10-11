import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formControl, TypedFormControl } from 'src/app/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly form: FormGroup;

  readonly username: TypedFormControl<string>;
  readonly password: TypedFormControl<string>;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });

    this.username = formControl<string>(this.form, 'username');
    this.password = formControl<string>(this.form, 'password');
  }

  ngOnInit(): void {
  }

}
