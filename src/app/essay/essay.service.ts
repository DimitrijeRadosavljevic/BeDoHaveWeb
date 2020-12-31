import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApiService } from '../_shared/services/base-api.service';
import { ExpressResponse } from '../_shared/models/express-response';

import { Essay } from '../_shared/models/essay';

@Injectable({
  providedIn: 'root'
})
export class EssayService extends BaseApiService {

  public getEssays(themeId: string, perPage?: number | string, page?: number | string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes/${themeId}/essays`, { params });
  }

  public getEssay(essayId: number): Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(`${this.apiUrl}/essays/${essayId}`);
  }

  public postEssay(themeId: number, essay: Essay): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(`${this.apiUrl}/themes/${themeId}/essays`, essay);
  }

  public putEssay(essay: Essay): Observable<ExpressResponse> {
    return this.http.put<ExpressResponse>(`${this.apiUrl}/essays/${essay.id}`, essay);
  }

  public deleteEssay(essayId: number): Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/essays/${essayId}`);
  }
}
