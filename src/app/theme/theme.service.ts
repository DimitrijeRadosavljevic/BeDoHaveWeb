import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../_shared/services/base-api.service';
import { ExpressResponse } from '../_shared/models/express-response';

import { Theme } from '../_shared/models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BaseApiService {

  public postTheme(theme: Theme): Observable<ExpressResponse<Theme>> {
    return this.http.post<ExpressResponse<Theme>>(`${this.apiUrl}/themes`, theme);
  }
}
