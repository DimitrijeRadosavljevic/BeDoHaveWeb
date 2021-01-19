import { authError } from './../../store/auth/auth.selectors';
import { register } from './../../store/auth/auth.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from '../../store'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formActive: boolean = true;
  public form: FormGroup;
  public errorText: string;
  public error: boolean = false;
  public passwordNotMatch: boolean = false;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  ngOnInit(): void {
    this.initializeComponent()
  }

  initializeComponent() {
    this.buildForm()
  }

  buildForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(val => {
      if( this.form.get('confirmPassword')?.value != this.form.get('password')?.value) {
        this.passwordNotMatch = true
      }
      else
        this.passwordNotMatch = false
    })
  }

  onSubmit() {
    if(!this.form.valid || this.passwordNotMatch == true){
      this.form.markAllAsTouched();
      return
    }
    this.store.dispatch(register ({data: this.form.value }))
    this.store.pipe(select(authError)).subscribe(
      data => {
        if(data) {
          if(data.error) {
            this.errorText = data.error;
            this.error = true;
          }
        } else {
          this.error = false;
        }
      });
  }

}
