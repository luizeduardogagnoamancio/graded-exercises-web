import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loginUrl = `${this.configService.apiUrl}/user/login`;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }
}
