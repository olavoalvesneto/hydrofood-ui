import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  restaurantesUrl = 'https://hydrofood-prod.cfapps.io/v1/restaurantes';
  refreshToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJqb2FvLmdlckBhbGdhZm9vZC5jb20uYnIiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiZXhwIjoxNTg2NzIzNDQ3LCJhdXRob3JpdGllcyI6WyJHRVJBUl9SRUxBVE9SSU9TIiwiRURJVEFSX0NPWklOSEFTIiwiQ09OU1VMVEFSX1VTVUFSSU9TX0dSVVBPU19QRVJNSVNTT0VTIiwiRURJVEFSX0NJREFERVMiLCJFRElUQVJfRk9STUFTX1BBR0FNRU5UTyIsIkVESVRBUl9SRVNUQVVSQU5URVMiLCJHRVJFTkNJQVJfUEVESURPUyIsIkVESVRBUl9VU1VBUklPU19HUlVQT1NfUEVSTUlTU09FUyIsIkNPTlNVTFRBUl9QRURJRE9TIiwiRURJVEFSX0VTVEFET1MiXSwianRpIjoiZjI1MmFiOGMtMWMxMC00YjM5LWJiYjEtNTljOWUzMzJkNjY4Iiwibm9tZV9jb21wbGV0byI6Ikpvw6NvIGRhIFNpbHZhIiwiY2xpZW50X2lkIjoiYWxnYWZvb2Qtd2ViIn0.T1fPUyDIR9CAn1_8gDTHMgwsmJGPSjuWCGvI7lbiHUQ5TCAPypBUdAI7X1mO14lgQOmTbFDUKsoj0sLqQmQ2yW3shq7kKEI7Q8kaUSHHNMwDBMxoZFv_4_rnMShdFlFykB5A7fQ5B26LTvuTSYRQtX__DDEZDovEbTW_kUIzA2Mxsdp5XRAqZOuck5wi0uoRpXVZM1q51yJFJMcXk-tLCZYj-Jtj7HwbyQKwbrknb6fpr8EbC1s-3YFqrOwAT_IJY7A5Ege9UGJZv-Ve0jcDGyYOxgDS277WK_zUuWzOaGcbrcQJFzglreNEsUP7At8JmzElDfS-S_mv_y4nAj56Mg';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken);
    return this.http.get<any>(this.restaurantesUrl, {headers})
      .toPromise()
      .then(response => response._embedded.restaurantes);
  }

  ativar(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.put(`${this.restaurantesUrl}/${codigo}/ativo`, {headers})
      .toPromise()
      .then(() => null);
  }

  inativar(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.delete(`${this.restaurantesUrl}/${codigo}/ativo`, {headers})
      .toPromise()
      .then(() => null);
  }

  abrir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.put(`${this.restaurantesUrl}/${codigo}/abertura`, {headers})
      .toPromise()
      .then(() => null);
  }

  fechar(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.put(`${this.restaurantesUrl}/${codigo}/fechamento`, {headers})
      .toPromise()
      .then(() => null);
  }

}
