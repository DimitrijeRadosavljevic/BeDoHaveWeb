import {Component, OnInit} from '@angular/core';
import { logout } from './store/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { State } from './store';
import {NavigationEnd, Router} from '@angular/router';
import { WebSocketService } from './_shared/services/web-socket.service';
import { User } from './_shared/models/user';
import { authUser } from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BeDoHaveWeb';
  public showLogout: boolean = true;
  public user: User;

  constructor(private store: Store<State>,
              private router: Router,
              private webSocket: WebSocketService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogout = !(this.router.url.includes('/register')  ||
          this.router.url.includes('/login'));
      }
    });

    //setTimeout( () => { this.initializeComponent() }, 1000);

   setTimeout(() => {
     this.webSocket.emit('povezano', "354");
   }, 1000);
  }

  public logout(): void {
    let channel = localStorage.getItem('subscribed');
    this.webSocket.disconect(channel);
    localStorage.removeItem('subscribed');
    this.store.dispatch(logout());
  }

  public initializeComponent() {
    this.store.pipe(select(authUser))
    .subscribe(user => {
      this.user = user;
      console.log(user);
      if(user) {
        this.webSocket.listen(user.id + 'Notification').subscribe((data) => {
          console.log(data);
          console.log("Data");
        })
      }
    });
  }
}
