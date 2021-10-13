import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formControl, TypedFormControl } from 'src/app/form';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly destroyed = new Subject();

  readonly form: FormGroup;

  readonly username: TypedFormControl<string>;
  readonly password: TypedFormControl<string>;

  constructor(private readonly sessionService: SessionService, fb: FormBuilder) {
    this.form = fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });

    this.username = formControl<string>(this.form, 'username');
    this.password = formControl<string>(this.form, 'password');
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username.valid && this.password.valid) {
      this.sessionService.login(this.username.value, this.password.value).pipe(
        takeUntil(this.destroyed)
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

}
