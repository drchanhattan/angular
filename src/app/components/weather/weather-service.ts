import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = environment.weather;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }
}
