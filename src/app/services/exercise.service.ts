import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { ExerciseCard } from '../models/dto/exercises/exerciseCard.dto';
import { ChapterDetail } from '../models/dto/chapter/chapter.dto';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exercisesUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.exercisesUrl = `${this.configService.apiUrl}/exercises`;
  }

  getExercises(): Observable<ExerciseCard[]> {
    return this.http.get<ExerciseCard[]>(this.exercisesUrl);
  }

  getChapterDetails(id: number): Observable<ChapterDetail> {
    return this.http.get<ChapterDetail>(`${this.exercisesUrl}/${id}`);
  }
}
