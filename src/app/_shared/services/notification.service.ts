import { BaseApiService } from './base-api.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpressResponse } from '../models/express-response';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseApiService {

  public getNotifications(seen: boolean, perPage?: number | string, page?: number | string,): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    params = params.set('seen', seen.toString());
    
    return this.http.get<ExpressResponse>(`${this.apiUrl}/notifications`, { params });
  }

  public updateNotifications(): Observable<ExpressResponse> {
    const notification = new Notification();
    notification.seen = true;
    return this.http.put<ExpressResponse>(`${this.apiUrl}/notifications/update`, notification);
  }

  public deleteNotifications(notification?: Notification): Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/notifications${(notification ? '/'+notification.id : '')}`);
  }
}
