import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected apiAuthUrl: string;
  protected apiUrl: string;

  constructor(public router: Router,
              public http: HttpClient) {

    this.apiAuthUrl = environment.API_AUTH_URL;
    this.apiUrl = environment.API_URL;
  }
}
