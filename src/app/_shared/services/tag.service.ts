import { Injectable } from '@angular/core';
import {BaseApiService} from './base-api.service';
import {Observable} from 'rxjs';
import {ExpressResponse} from '../models/express-response';
import {Tag} from '../models/tag';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseApiService {

  public getTags(name: string): Observable<ExpressResponse<Tag[]>> {
    let params = new HttpParams();

    params = (name ? params.set('name', name) : params);

    return this.http.get<ExpressResponse<Tag[]>>(`${this.apiUrl}/tags`, { params });
  }

  public getTagsForTheme(themeId: string | null) :Observable<ExpressResponse<Tag[]>> {
    return this.http.get<ExpressResponse<Tag[]>>(`${this.apiUrl}/tags/${themeId}`);
  }
}
