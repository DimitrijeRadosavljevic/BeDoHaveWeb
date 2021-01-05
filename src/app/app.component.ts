import {Component, OnInit} from '@angular/core';
import { logout } from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { State } from './store';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BeDoHaveWeb';
  public showLogout: boolean = true;

  constructor(private store: Store<State>,
              private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogout = !(this.router.url.includes('/register')  ||
          this.router.url.includes('/login'));
      }
    });
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
