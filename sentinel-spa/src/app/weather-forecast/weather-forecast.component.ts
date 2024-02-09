import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { WeatherForecastService } from '../core/services/weather-forecast.service';
import { WeatherForecast } from '../core/services/model/weather.forecast.model';
import { Observable, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { query } from '@angular/animations';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnChanges{

  searchSection = new FormGroup({
    searchBox: new FormControl('',[
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z0-9]+$')
    ])
  });

  private weatherForecastService = inject(WeatherForecastService);
  weatherForecasts$: Observable<WeatherForecast[]> | undefined;
  filteredForecasts$: Observable<WeatherForecast[]> | undefined;

  ngOnInit(): void{
    this.weatherForecasts$ = this.weatherForecastService.getAllWeather();
    
    this.filteredForecasts$ = this.searchSection.get('searchBox')?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query === null || query === undefined || query === '') {
          return this.weatherForecasts$!; // Return all forecasts if query is null, undefined, or empty
        }
        return this.weatherForecasts$!.pipe(
          map((forecasts: WeatherForecast[]) =>
            forecasts.filter(forecast =>
              forecast.summary.toLowerCase().includes(query.toLowerCase())
            )
          )
        );
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void{
    alert('chnage');
  }

}
