import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})

  //Injectamos el objeto Http via constructor
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {

    return this.http.get(this.urlEndpoint).pipe(
      map( response => response as Cliente[])
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
   return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders} )
  }

  getCliente(id): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`)
    
  }

  update(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders} ) 
  }  

  delete(id: number): Observable<Cliente> {
   return   this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,  {headers: this.httpHeaders} )
  }
}
