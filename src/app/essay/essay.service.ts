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

  public getEssay(essayId: string): Observable<ExpressResponse<Essay>> {
    return this.http.get<ExpressResponse<Essay>>(`${this.apiUrl}/essays/${essayId}`);
  }

  public postEssay(themeId: string, essay: Essay): Observable<ExpressResponse<Essay>> {
    return this.http.post<ExpressResponse<Essay>>(`${this.apiUrl}/themes/${themeId}/essays`, essay);
  }

  public putEssay(essay: Essay): Observable<ExpressResponse<Essay>> {
    return this.http.put<ExpressResponse<Essay>>(`${this.apiUrl}/essays/${essay.id}`, essay);
  }

  public deleteEssay(essayId: string): Observable<ExpressResponse<null>> {
    return this.http.delete<ExpressResponse<null>>(`${this.apiUrl}/essays/${essayId}`);
  }
}
