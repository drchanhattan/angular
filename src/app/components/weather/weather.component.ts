import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather-service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  name!: string;
  description!: string;
  temperature!: number;
  icon!: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather('Bristol, GB');
  }

  private getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.name = data.name;
      this.description = data.weather[0].description;
      this.temperature = Math.round(data.main.temp);
      this.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    });
  }
}
