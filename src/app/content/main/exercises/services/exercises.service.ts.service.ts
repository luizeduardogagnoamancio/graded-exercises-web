import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../model/card';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesServiceTsService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getExercicios(): Observable<Exercise[]> {
    const url = `${this.baseUrl}/exercise`;
    return this.httpClient.get<Exercise[]>(url).pipe(
      catchError((error: any) => {
        // Trate o erro aqui (por exemplo, registre-o, mostre uma mensagem de erro)
        console.error('Ocorreu um erro:', error);
        // Reenvie o erro para que os observadores possam tratá-lo
        return throwError(error);
      })
    );
  }
}
