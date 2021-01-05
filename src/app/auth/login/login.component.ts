import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import {State} from '../../store';

import {login} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formActive: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private store: Store<State>) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['admin@admin.com'],
      password: ['admin']

      // email: ['admin@admin.com', [Validators.required, Validators.email]],
      // password: ['admin', [Validators.required]]
    });
    this.formActive = true;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(login({ data: this.form.value}))
  }
}
