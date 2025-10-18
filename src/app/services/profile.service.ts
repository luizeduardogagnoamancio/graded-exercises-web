import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { UserProfile } from '../models/dto/profile/userProfile.dto';

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

  updateAvatar(avatarUrl: string): Observable<void> {
    return this.http.put<void>(`${this.profileUrl}/avatar`, { avatarUrl });
  }
}
