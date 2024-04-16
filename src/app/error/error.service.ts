import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) {
  }

  notifyError(): void {
    this.snackBar.open('An error occurred', 'Dismiss', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
