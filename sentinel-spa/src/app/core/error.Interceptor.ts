import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        this.showErrorMessage(error);
        return throwError(error);
      })
    );
  }

  private showErrorMessage(error: any): void {
    let message = 'An error occurred';
    if (error instanceof HttpErrorResponse) {
      message = error.message.toString() || 'An error occurred';
    } else if (typeof error === 'string') {
      message = error;
    }
    this.snackBar.open(message, 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'],
      duration: 3000,
    });
  }
}
