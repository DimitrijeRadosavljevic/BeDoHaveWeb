import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';
import { Notification } from "../../models/notification"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public loading: number = 0;
  public notifications: Notification []; 
  public alreadySeen: boolean = false;
  public notificationForDelete: Notification | undefined;

  public paginationConfig: PaginatePipeArgs = {
    id: 'essays',
    itemsPerPage: 10,
    currentPage: 1
  };
  constructor(private notificationService: NotificationService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.alreadySeen = false;
    this.fetchNotifications(this.alreadySeen);
    this.updateNotifications();
  }
  public onPageChange($event: number): void {
    this.paginationConfig.currentPage = $event;
    this.fetchNotifications(this.alreadySeen);
  }

  public fetchNotifications(seen: boolean){
    this.loading++
    this.notificationService.getNotifications(seen, this.paginationConfig.itemsPerPage, this.paginationConfig.currentPage).subscribe(
      response => {
        this.paginationConfig.totalItems = response.data.total;
        this.notifications = response.data.notifications as Notification [];
        console.log(response);
      },
      error => {
        this.router.navigate(['error'])
      },
      () => {
        this.loading--
      }
    )
  }

  public updateNotifications() {
    this.notificationService.updateNotifications().subscribe(
      response => {

      },
      error => {
        this.toastrService.error("Some error ocured please go back and clisk on the notifications again");
      }
    )
  }

  public getAllNotifications() {
    this.alreadySeen = !this.alreadySeen;
    this.fetchNotifications(this.alreadySeen);
  }

  public deleteNotifications() {
    this.loading++
    this.notificationService.deleteNotifications(this.notificationForDelete).subscribe(
      response => {
        this.toastrService.success("Successfully deleted");
        this.fetchNotifications(this.alreadySeen)
      },
      error => {
       this.toastrService.error("Some error ocured please try later");
      },
      () => {
        this.loading--
      }
    )
  }

  public unsetNotificationForDelete() {
    this.notificationForDelete = undefined;
  }

  public setNotificationForDelete(notification: Notification) {
    this.notificationForDelete = notification;
  }

}
