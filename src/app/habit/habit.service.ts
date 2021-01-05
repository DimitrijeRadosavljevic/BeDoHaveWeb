import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApiService } from '../_shared/services/base-api.service';
import { ExpressResponse } from '../_shared/models/express-response';

import { Habit } from '../_shared/models/habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService extends BaseApiService {

  public getHabits(perPage?: number | string, page?: number | string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/habits`, { params });
  }

  public getHabit(habitId: string): Observable<ExpressResponse<Habit>> {
    return this.http.get<ExpressResponse<Habit>>(`${this.apiUrl}/habits/${habitId}`);
  }


  public postHabit(habit: Habit): Observable<ExpressResponse<Habit>> {
    return this.http.post<ExpressResponse<Habit>>(`${this.apiUrl}/habits`, habit);
  }

  public putHabit(habit: Habit): Observable<ExpressResponse<Habit>> {
    return this.http.put<ExpressResponse<Habit>>(`${this.apiUrl}/habits/${habit.id}`, habit);
  }

  public deleteHabit(habitId: string): Observable<ExpressResponse<null>> {
    return this.http.delete<ExpressResponse<null>>(`${this.apiUrl}/habits/${habitId}`);
  }
}
