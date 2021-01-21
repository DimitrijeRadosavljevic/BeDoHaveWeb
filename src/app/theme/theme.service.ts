import { ExpressResponse } from './../_shared/models/express-response';
import { BaseApiService } from './../_shared/services/base-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../_shared/models/theme';
import { tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BaseApiService {

  public postTheme(theme: Theme): Observable<ExpressResponse<Theme>> {
    return this.http.post<ExpressResponse<Theme>>(`${this.apiUrl}/themes`, theme);
  }

  public getThemes():Observable<ExpressResponse<Theme[]>> {
    return this.http.get<ExpressResponse<Theme[]>>(`${this.apiUrl}/themes`);
  }

  public getThemesPaginate(perPage?: number | string, page?: number | string, title?:string, tags?:string, filterOverdueThemesDate?:string): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    params = (title ? params.set('title', title.toString()): params);

    params = (tags ? params.set('tags', tags.toString()): params);

    params = (filterOverdueThemesDate ? params.set('filterOverdueThemesDate', filterOverdueThemesDate.toString()): params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes`, { params });
  }

  public getTheme(themeId: string | null, tags:boolean) :Observable<ExpressResponse<Theme>> {
    let params = new HttpParams();
    params = (tags ? params.set('tags', tags.toString()): params);
    return this.http.get<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${themeId}`, { params });
  }

  public deleteTheme(themeId: string | null) :Observable<ExpressResponse<null>> {
    return this.http.delete<ExpressResponse<null>>(`${this.apiUrl}/themes/${themeId}`);
  }

  public getThemeWithEssays(themeId: string | null) :Observable<ExpressResponse<Theme>> {
    return this.http.get<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${themeId}`);
  }

  public getThemePublic(themeId: string): Observable<ExpressResponse<Theme>> {
    return this.http.get<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${themeId}/public`);
  }

  public putTheme(theme: Theme): Observable<ExpressResponse<Theme>> {
    return this.http.put<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${theme.id}`, theme);
  }

  public getOverdueThemes(currentDate: string): Observable<ExpressResponse<boolean>> {
    let params = new HttpParams();
    params = params.set('currentDate', currentDate.toString());
    return this.http.get<ExpressResponse<boolean>>(`${this.apiUrl}/themes/overdueThemes/354`, { params })
  }

  public publishTheme(theme: Theme): Observable<ExpressResponse<Theme>> {
    console.log(theme);
    return this.http.put<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${theme.id}/public`, theme)
  }

  public fetchPublicThemes(perPage?: number | string, page?: number | string, title?:string, tags?:string): Observable<ExpressResponse> {
    let params = new HttpParams();
    params = (page ? params.set('page', page.toString()) : params);

    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    params = (title ? params.set('title', title.toString()): params);

    params = (tags ? params.set('tags', tags.toString()): params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes/public/getPublicThemes`, { params });
  }

  public patchTheme(themeId: string, scheduleAnswer: string): Observable<ExpressResponse<Theme>> {
    return this.http.patch<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${themeId}`, { scheduleAnswer });
}
  public fetchThemesPersonalized(perPage?: string | number, page?: string | number): Observable<ExpressResponse> {
    let params = new HttpParams();

    params = (page ? params.set('page', page.toString()) : params);
    params = (perPage ? params.set('perPage', perPage.toString()) : params);

    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes-personalized`, { params });
  }

  public getRandomTheme(): Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes/public/randomTheme`);
  }

  public getNumberOfRandomThemes(): Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(`${this.apiUrl}/themes/public/randomTheme/number`);
  }

  public subscribeOnTheme(theme: Theme, themeId: string | undefined): Observable<ExpressResponse> {
    let params = new HttpParams();
    params = (themeId ? params.set('themeId', themeId.toString()) : params);
    return this.http.post<ExpressResponse>(`${this.apiUrl}/subscribe-on-theme`, theme, { params });
  }

  public unsubscribeFromTheme(theme: Theme): Observable<ExpressResponse> {
    return this.http.post<ExpressResponse>(`${this.apiUrl}/unsubscribe-from-theme`, theme);
  }

  public getThemeSpecific(themeId: string) :Observable<ExpressResponse<Theme>> {
    return this.http.get<ExpressResponse<Theme>>(`${this.apiUrl}/themes/${themeId}/specific`);
  }

  public getNotificationsFromRedis() :Observable<ExpressResponse> {
    return this.http.get<ExpressResponse>(`${this.apiUrl}/notifications-redis`);
  }

  public deleteNotificationsFromSubscribedThemes():Observable<ExpressResponse> {
    return this.http.delete<ExpressResponse>(`${this.apiUrl}/notifications-redis`);
  }
  
}
