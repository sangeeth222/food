import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
   
  

  constructor(private snackbar:MatSnackBar) { }
  public showSuccessMessage(message: string, duration: number = 9000): void { // Default 9s
    this.snackbar.open(message, "Close", {
      duration: duration,
      panelClass: ["green-snackbar"],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  public showErrorMessage(message: string, duration: number = 9000): void { // Default 9s
    this.snackbar.open(message, "Close", {
      duration: duration,
      panelClass: ["red-snackbar"],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}