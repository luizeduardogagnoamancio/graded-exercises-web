import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  completedChapters: number;
  totalChapters: number;
  overallAccuracy: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.profileUrl = `${this.configService.apiUrl}/profile`;
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileUrl);
  }
}
