import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table/table';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProdutoService, ProdutoFiltro } from './../produto.service';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  produtos = [];
  produtoId: number;

  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private produtoService: ProdutoService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de produtos');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService.pesquisar(this.filtro)
      .then((resultado: any) => {
        console.log(resultado.total);
        console.log(resultado.produtos);
        this.totalRegistros = resultado.total;
        this.produtos = resultado.produtos;
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.itensPorPagina = event.rows;
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtoService.excluir(produto.id)
    .then(() => {
      this.grid.reset();
      this.toasty.success('Produto excluida com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
