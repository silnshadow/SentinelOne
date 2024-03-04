import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { WeatherForecastService } from '../core/services/weather-forecast.service';
import { WeatherForecast } from '../core/services/model/weather.forecast.model';
import { Observable, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { query } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog-overview-example-dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnChanges{

  animal: string = '';
  name: string = '';
  isDialogOpen = false;


  constructor(public dialog: MatDialog){}
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
          return this.weatherForecasts$!;
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

  openDialog(): void {
    // Check if the dialog is already open
    if (!this.isDialogOpen) {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            data: { name: this.name, animal: this.animal },
        });

        // Set the flag to true when the dialog is opened
        this.isDialogOpen = true;

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;

            // Set the flag back to false when the dialog is closed
            this.isDialogOpen = false;
        });
    } else {
        console.log('Dialog is already open');
    }
}
}