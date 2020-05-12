import { Produto } from './../core/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProdutoFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produtosUrl = 'https://hydrofood-prod.cfapps.io/v1/restaurantes/1/produtos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: ProdutoFiltro): Promise<any> {

   // let params = new HttpParams();

  //  params = params.set('page', filtro.pagina.toString());
  //  params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
    //  params = params.set('nome', filtro.nome);
    }
    return this.http.get<any>(this.produtosUrl )
      .toPromise()
      .then(response => {
        const produtos = response._embedded.produtos;

        const resultado = {
          produtos
          //,     total: response.page.totalElements
        };
        return resultado;
      })
      .catch(erro => console.log(erro));

  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.produtosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(
      this.produtosUrl, produto)
      .toPromise();
  }

  atualizar(produto: any): Promise<Produto> {
    const produtoId = produto.id;
    delete produto.id;
    delete produto._links;
    return this.http.put<Produto>(`${this.produtosUrl}/${produtoId}`, produto)
      .toPromise();
  }

  buscarPorCodigo(id: number): Promise<Produto> {

    return this.http.get<Produto>(`${this.produtosUrl}/${id}`)
      .toPromise();
  }

}
