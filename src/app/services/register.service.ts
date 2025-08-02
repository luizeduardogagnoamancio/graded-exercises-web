import { ConfigService } from './config.service';
import { RegisterRequestDto } from '../models/dto/register/registerRequest.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private basePath: string = 'user/register';

  constructor(private httpClient: HttpClient,
              private configService: ConfigService) { }

  register(RegisterRequestDto: RegisterRequestDto) {
    const url = `${this.configService.apiUrl}/${this.basePath}`;
    return this.httpClient.post<any>(url, RegisterRequestDto);
  }
}
