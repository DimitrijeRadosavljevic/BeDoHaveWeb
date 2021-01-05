import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable } from 'rxjs';
import {ExpressResponse} from '../models/express-response';

@Injectable({
  providedIn: 'root'
})
export class LikeService extends BaseApiService {

  public likeTheme(themeId: string): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(`${this.apiUrl}/likes/theme/${themeId}`, { });
  }

  public unLikeTheme(themeId: string): Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/likes/theme/${themeId}`);
  }

  public likeEssay(essayId: string): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(`${this.apiUrl}/likes/essay/${essayId}`, { });
  }

  public unLikeEssay(essayId: string): Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/likes/essay/${essayId}`);
  }
}
