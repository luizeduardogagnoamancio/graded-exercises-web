import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {
  private userAnswerUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.userAnswerUrl = `${this.configService.apiUrl}/user-answers`;
  }

  saveAnswer(questionId: number, isCorrect: boolean): Observable<void> {
    const payload = { questionId, isCorrect };
    return this.http.post<void>(this.userAnswerUrl, payload);
  }

  resetChapterProgress(chapterId: number): Observable<void> {
    return this.http.delete<void>(`${this.userAnswerUrl}/chapter/${chapterId}`);
  }
}
