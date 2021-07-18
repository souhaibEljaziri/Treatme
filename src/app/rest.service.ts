import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

const endpoint = environment.api_endpoint;

export interface Payment {
  id: string;
  patient: string;
  oxygen: string;
  supplier: string;
  created_at: string;
  price: string;
  tax: string;
  total: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getPayments(): Observable<any> {
    return this.http.get<Payment>(endpoint + 'payments/all').pipe(
      catchError(this.handleError)
    );
   }
  
  public updateActiveItem(text: string): void {
    const elements: NodeListOf<Element> = document.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) {
        element.classList.remove('active-item');
      }
    });
    document.querySelector('.sidebar-item.' + text).classList.add('active-item');
  }
}
