import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

const endpoint = environment.api_endpoint;

export interface Patient {
  id: string;
  patientName: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  mobileNumber: string;
  email: string;
}

export interface Oxygen {
  id: string;
  waterCapacity: string;
  oxygeneCapacity: string;
  status: string;
  price: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  location: string;
}

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
  public activePaymentData: Record<string, any>;

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

  /**Patients */
  getPatients(): Observable<any> {
    return this.http.get<Patient>(endpoint + 'patients/all').pipe(
      catchError(this.handleError)
    );
   }
  
  /**Oxygen */
  getOxygenById(id: string): Observable<any> {
    return this.http.get<Oxygen>(endpoint + 'oxygen/' + id).pipe(
      catchError(this.handleError)
    );
   }
  
  /***Suppliers */
  getSuppliers(): Observable<any> {
    return this.http.get<Supplier>(endpoint + 'suppliers/all').pipe(
      catchError(this.handleError)
    );
   }
  
  getOxygenBySupplier(id: string): Observable<any> {
    return this.http.get<Supplier>(endpoint + 'suppliers/'+ id +'/oxygen').pipe(
      catchError(this.handleError)
    );
   }

  /***Payments */
  getPayments(): Observable<any> {
    return this.http.get<Payment>(endpoint + 'payments/all').pipe(
      catchError(this.handleError)
    );
   }
  
  addPayment(payment: any): Observable<any> {
    return this.http.post(endpoint + 'payments/new', payment).pipe(
      catchError(this.handleError)
    );
  }

  deletePayment(id: string): Observable<any> {
    return this.http.delete(endpoint + 'payments/delete/' + id).pipe(
      catchError(this.handleError)
    );
  }

  public getActivePaymentData(): Record<string, any> {
    return this.activePaymentData;
  }

  public setActivePaymentData(data: Record<string, any>): void {
    this.activePaymentData = data;
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
