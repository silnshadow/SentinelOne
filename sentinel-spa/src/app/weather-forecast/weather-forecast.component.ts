import { Component, Inject, OnChanges, SimpleChanges, inject } from '@angular/core';
import { WeatherForecastService } from '../core/services/weather-forecast.service';
import { WeatherForecast } from '../core/services/model/weather.forecast.model';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { query } from '@angular/animations';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css',
})
export class WeatherForecastComponent implements OnChanges {
  animal: string = '';
  name: string = '';
  isDialogOpen = false;
  weatherForm = this.fb.group({
    summary: ['', Validators.required],
    temperatureC: [0, Validators.required],
    temperatureF: [0, Validators.required],
  });

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}
  searchSection = new FormGroup({
    searchBox: new FormControl('', [
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z0-9]+$'),
    ]),
  });

  private weatherForecastService = inject(WeatherForecastService);
  weatherForecasts$: Observable<WeatherForecast[]> | undefined;
  filteredForecasts$: Observable<WeatherForecast[]> | undefined;

  ngOnInit(): void {
    this.weatherForecasts$ = this.weatherForecastService.getAllWeather();

    this.filteredForecasts$ = this.searchSection
      .get('searchBox')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query === null || query === undefined || query === '') {
            return this.weatherForecasts$!;
          }
          return this.weatherForecasts$!.pipe(
            map((forecasts: WeatherForecast[]) =>
              forecasts.filter((forecast) =>
                forecast.summary.toLowerCase().includes(query.toLowerCase())
              )
            )
          );
        })
      );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  openDialog(): void {
    if (!this.isDialogOpen) {
      const dialogConfig: MatDialogConfig = {
        data: {}, // Optionally, you can pass data to the dialog
        width: '400px',
        height: '350px',
      };

      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, dialogConfig);

      this.isDialogOpen = true;

      dialogRef.afterClosed().subscribe((result: WeatherForecast) => {
        console.log('The dialog was closed');
        if (result) {
          this.weatherForecastService.addWeatherForecast(result).subscribe((newId: number) => {
            console.log('New weather forecast added with ID:', newId);
            // Optionally, you can perform any additional actions after adding the forecast
          });
        }
        this.isDialogOpen = false;
      });
    } else {
      console.log('Dialog is already open');
    }
  }

  EditWeather(): void {}

  HighlightWeather(): void {}

  DeleteWeather(): void {}
}
