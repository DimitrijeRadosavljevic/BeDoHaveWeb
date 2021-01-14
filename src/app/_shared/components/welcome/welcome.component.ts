import { NotificationService } from './../../services/notification.service';
import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {State} from '../../../store';
import {select, Store} from '@ngrx/store';
import {User} from '../../models/user';
import {authUser} from '../../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/web-socket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public user: User;
  public notification: boolean;
  public subscribed: string | null = null;

  constructor(private store: Store<State>, 
              private router: Router, 
              private webSocket: WebSocketService, 
              private toastrService: ToastrService,
              private notificationService: NotificationService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    this.store.pipe(select(authUser))
      .subscribe(user => {
        this.user = user;
        this.subscribed = localStorage.getItem('subscribed');
        if(this.subscribed == null) {
          if(user) {
            this.webSocket.listen(user.id + 'Notification').subscribe((data: any) => {
              this.toastrService.show(data);
              this.notification = true;
              this.ref.detectChanges();
              this.getNotifications();
              console.log(this.notification);
              console.log(data);
            })
          }
          if(user) {
            localStorage.setItem('subscribed', user.id + 'Notification');
          }
        }
      });
      this.getNotifications()
  }

  public getNotifications() {
    this.notificationService.getNotifications(false, undefined, undefined).subscribe(
      response => {
        if(response.data.notifications.length > 0 || response.data.total > 0) {
          this.notification = true;
        } else {
          this.notification = false;
        }
       this.ref.detectChanges();
      }
    )
  }

  public goToNotifications() {
    this.notification = false;
    this.router.navigate(['welcome/notifications']);
  }
}
