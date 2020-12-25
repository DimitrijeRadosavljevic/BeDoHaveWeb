import { Component, OnInit } from '@angular/core';
import {State} from '../../../store';
import {select, Store} from '@ngrx/store';
import {User} from '../../models/user';
import {authUser} from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public user: User;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.store.pipe(select(authUser))
      .subscribe(user => {
        this.user = user;
      });
  }
}
