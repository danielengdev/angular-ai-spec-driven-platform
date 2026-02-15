
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CadastroDeContaRequest {
  fullName: any;
  email: any;
  password: any;
}

export interface CadastroDeContaResponse {
  id: any;
  createdAt: any;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroDeContaService {

  constructor(private http: HttpClient) {}

  create(data: CadastroDeContaRequest): Observable<CadastroDeContaResponse> {
    return this.http.post<CadastroDeContaResponse>('/users', data);
  }

}
