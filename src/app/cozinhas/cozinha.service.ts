import { Cozinha } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CozinhaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class CozinhaService {
  cozinhasUrl = 'https://hydrofood-prod.cfapps.io/v1/cozinhas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: CozinhaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get<any>(this.cozinhasUrl, { params })
      .toPromise()
      .then(response => {
        const cozinhas = response._embedded.cozinhas;

        const resultado = {
          cozinhas,
          total: response.page.totalElements
        };
        return resultado;
      });

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.cozinhasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(cozinha: Cozinha): Promise<Cozinha> {
    return this.http.post<Cozinha>(
      this.cozinhasUrl, cozinha)
      .toPromise();
  }

  atualizar(cozinha: any): Promise<Cozinha> {
    const cozinhaId = cozinha.id;
    delete cozinha.id;
    delete cozinha._links;
    return this.http.put<Cozinha>(`${this.cozinhasUrl}/${cozinhaId}`, cozinha)
      .toPromise();
  }

  buscarPorCodigo(id: number): Promise<Cozinha> {

    return this.http.get<Cozinha>(`${this.cozinhasUrl}/${id}`)
      .toPromise();
  }

}
