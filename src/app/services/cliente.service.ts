import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/ClienteModel';
import { ServiceResponse } from '../models/ServiceResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environment.ApiUrl}/Cliente`;
  constructor(private http: HttpClient) {}

  GetClientes(): Observable<ServiceResponse<ClienteModel[]>> {
    return this.http.get<ServiceResponse<ClienteModel[]>>(this.apiUrl);
  }

  GetCliente(id: number): Observable<ServiceResponse<ClienteModel>>{
    return this.http.get<ServiceResponse<ClienteModel>>(`${this.apiUrl}/${id}`);
  }

  CreateCliente(cliente: ClienteModel): Observable<ServiceResponse<ClienteModel[]>>{
    return this.http.post<ServiceResponse<ClienteModel[]>>(`${this.apiUrl}`, cliente);
  };

  EditarCliente(cliente: ClienteModel): Observable<ServiceResponse<ClienteModel[]>>{
    return this.http.put<ServiceResponse<ClienteModel[]>>(`${this.apiUrl}`, cliente);
  }

  InativaCliente(id: number): Observable<ServiceResponse<ClienteModel[]>>{
    return this.http.put<ServiceResponse<ClienteModel[]>>(`${this.apiUrl}/InativarCliente/${id}`, id);
  }

  DeleteCliente(email: string): Observable<ServiceResponse<ClienteModel[]>>{
    return this.http.delete<ServiceResponse<ClienteModel[]>>(`${this.apiUrl}/${email}`);
  }


}
