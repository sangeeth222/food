import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  

  constructor(private snackbar:MatSnackBar) { }

 
  public showSuccessMessage(message: string): void {
    this.snackbar.open(message, "close", {
      duration: 9000,
      panelClass: ["green-snackbar"],
      horizontalPosition: 'end',
      verticalPosition: 'top' // Corrected position to top
    });
  }

  public showErrorMessage(message: string): void {
    this.snackbar.open(message, "close", {
      duration: 9000,
      panelClass: ["red-snackbar"],
      horizontalPosition: 'end',
      verticalPosition: 'top' // Corrected position to top
    });
  }
   
    

}
