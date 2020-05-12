import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuariosUrl = 'https://hydrofood-prod.cfapps.io/v1/usuarios';
  refreshToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJqb2FvLmdlckBhbGdhZm9vZC5jb20uYnIiLCJzY29wZSI6WyJSRUFEIiwiV1JJVEUiXSwiZXhwIjoxNTg3MjQyNTg0LCJhdXRob3JpdGllcyI6WyJHRVJBUl9SRUxBVE9SSU9TIiwiRURJVEFSX0NPWklOSEFTIiwiQ09OU1VMVEFSX1VTVUFSSU9TX0dSVVBPU19QRVJNSVNTT0VTIiwiRURJVEFSX0NJREFERVMiLCJFRElUQVJfRk9STUFTX1BBR0FNRU5UTyIsIkVESVRBUl9SRVNUQVVSQU5URVMiLCJHRVJFTkNJQVJfUEVESURPUyIsIkVESVRBUl9VU1VBUklPU19HUlVQT1NfUEVSTUlTU09FUyIsIkNPTlNVTFRBUl9QRURJRE9TIiwiRURJVEFSX0VTVEFET1MiXSwianRpIjoiNWIxMzlhMTItZmFjMS00ZTE0LWJlZjktZmJlMjZlNzNlY2E0Iiwibm9tZV9jb21wbGV0byI6Ikpvw6NvIGRhIFNpbHZhIiwiY2xpZW50X2lkIjoiYWxnYWZvb2Qtd2ViIn0.nLQ_6dp0FDe9buujXRPqLOCaiAeTWyoPdhCbwSk4X8u8m9qF0zzfvEuUqJq7UfzChsudLcnI_y0xYLc19hNgD99_VT1aPfuwbPYtGUqqgTJV_8uiwnxwWhqFUmyYjrffO1uu5x6SEaOAYuuHxyi2GUgIrGxxZGFmeU_Xa1I-ugCVBUEHf8LLpp5gE929OsLF5kOhya2aaSC25XzSiZ22QV5hP1JHmVwNl5kOM03S698m7jA5cx57sfilflzMYh4jrEgjpcRohxufWT9ONtCUeQRDT819G7BalrQyX4kj80NIcbGZALM80iDX6meNUdW-wzTH2F2KsI4z8LfJxZb5rA';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.get<any>(this.usuariosUrl, { headers })
      .toPromise()
      .then(response => response._embedded.usuarios);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', this.refreshToken );
    return this.http.delete(`${this.usuariosUrl}/${codigo}`, {headers})
      .toPromise()
      .then(() => null);
  }

}
