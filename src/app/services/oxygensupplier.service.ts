import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
const BASE_PATH = "http://127.0.0.1:8000/api";
@Injectable({
  providedIn: 'root'
})
export class OxygenSupplierService {

  constructor(private httpClient: HttpClient) { }
  update(body?: any): Observable<any> {
    // verify required parameters are not null or undefined
    if (body === null || body === undefined) {
      return throwError("Required parameter body was null or undefined.");
    }
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.httpClient.put<any>(
      `${BASE_PATH}/oxygen_suppliers/`+body.id,
      body,
      { headers: headers }
    );
  }
  save(body?: any): Observable<any> {
    // verify required parameters are not null or undefined
    if (body === null || body === undefined) {
      return throwError("Required parameter body was null or undefined.");
    }
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.httpClient.post<any>(
      `${BASE_PATH}/oxygen_suppliers`,
      body,
      { headers: headers }
    );
  }

  find(
    id?: string
  ): Observable<any> {
    let params = new HttpParams();
    if (id !== undefined) {
      params = params.append("id", id.toString());
    }

    return this.httpClient.get<any>(
      `${BASE_PATH}/oxygen_suppliers`,
      { params: params }
    );
  }
  delete(
    id?: string
  ): Observable<any> {

    return this.httpClient.delete<any>(
      `${BASE_PATH}/oxygen_suppliers/`+id.toString()
    );
  }
  findAll(): Observable<any> {
    let params = new HttpParams();

    return this.httpClient.get<any>(
      `${BASE_PATH}/oxygen_suppliers`,
      { params: params }
    );
  }
}
