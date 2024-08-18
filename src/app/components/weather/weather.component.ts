import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  @HostBinding('class') hostClasses = 'm-4 text-mat-cream flex text-xs font-semibold';
  @Input() location: string = 'Bristol, GB';

  name!: string;
  description!: string;
  temperature!: number;
  #apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  #apiKey = environment.weather;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeather(this.location);
  }

  private getWeather(city: string) {
    const url = `${this.#apiUrl}?q=${city}&appid=${this.#apiKey}&units=metric`;
    this.http.get(url).subscribe((data: any) => {
      this.name = data.name;
      this.description = data.weather[0].description;
      this.temperature = Math.round(data.main.temp);
    });
  }
}
