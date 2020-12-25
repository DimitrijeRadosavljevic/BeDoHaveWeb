import { Injectable } from '@angular/core';
import {BaseApiService} from '../_shared/services/base-api.service';
import {Observable} from 'rxjs';
import {ExpressResponse} from '../_shared/models/express-response';
import {User} from '../_shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {

  login(data: any): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(this.apiAuthUrl + '/login', data);
  }

  register(data: User): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(this.apiAuthUrl + '/register', data);
  }

  logout(): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(this.apiAuthUrl + '/logout', null);
  }

  identify(): Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(this.apiAuthUrl + '/identify');
  }
}
