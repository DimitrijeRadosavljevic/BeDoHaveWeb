import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

import {BaseApiService} from '../_shared/services/base-api.service';

import {ExpressResponse} from '../_shared/models/express-response';
import {HabitRecord} from '../_shared/models/habit-record';

@Injectable({
  providedIn: 'root'
})
export class HabitRecordService extends BaseApiService {

  public getHabitRecords(habitId: string, perPage?: number | string, page?: number | string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/habits/${habitId}/habit-records`, { params });
  }

  public postHabitRecord(habitId: string, habitRecord: HabitRecord): Observable<ExpressResponse<HabitRecord>> {
    return this.http.post<ExpressResponse<HabitRecord>>(`${this.apiUrl}/habits/${habitId}/habit-records`, habitRecord);
  }

  public putHabitRecord(habitRecord: HabitRecord): Observable<ExpressResponse<HabitRecord>> {
    return this.http.put<ExpressResponse<HabitRecord>>(`${this.apiUrl}/habit-records/${habitRecord.id}`, habitRecord);
  }

  public deleteHabitRecord(habitRecordId: string): Observable<ExpressResponse<null>> {
    return this.http.delete<ExpressResponse<null>>(`${this.apiUrl}/habit-records/${habitRecordId}`);
  }
}
