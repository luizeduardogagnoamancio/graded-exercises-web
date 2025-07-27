import { appConfig } from './../app.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


export interface AppConfig {
  apiUrl: string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config?: AppConfig;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    const configFile = 'assets/config.json';

    return firstValueFrom(this.http.get<AppConfig>(configFile))
      .then(config => {
        this.config = config;
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  get apiUrl(): string {
    if (!this.config) {
      throw new Error('A configuração não foi carregada. Verifique o APP_INITIALIZER.');
    }
    return this.config.apiUrl;
  }
}
