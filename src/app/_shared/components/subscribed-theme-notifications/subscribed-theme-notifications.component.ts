import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-subscribed-theme-notifications',
  templateUrl: './subscribed-theme-notifications.component.html',
  styleUrls: ['./subscribed-theme-notifications.component.scss']
})
export class SubscribedThemeNotificationsComponent implements OnInit {
  public notifications: any[];
  public loading: number = 0;
  constructor(private themeService: ThemeService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initializeComponent();
  }

  public initializeComponent() {
    this.getNotifications();
  }

  public getNotifications() {
    this.loading++
    this.themeService.getNotificationsFromRedis().subscribe(
      response => {
        this.notifications = response.data;
      },
      error => {
        console.log("Error occured");
      },
      () => {
        this.loading--
      }
    )
  }

  public goToTheme(themeId: string) {
    this.router.navigate([`themes/${themeId}/public`]);
  }

  public deleteNotifications() {
    this.loading++
    this.themeService.deleteNotificationsFromSubscribedThemes().subscribe(
      response => {
       this.toastrService.success("Notifications are deleted successfully");
       this.getNotifications();
      },
      error => {
        this.toastrService.error("Some error ocured please try leater");
      },
      () => {
        this.loading--
      }
      
    ) 
  }
}
