import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table/table';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'ng2-toasty';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CozinhaService, CozinhaFiltro } from './../cozinha.service';

@Component({
  selector: 'app-cozinhas-pesquisa',
  templateUrl: './cozinhas-pesquisa.component.html',
  styleUrls: ['./cozinhas-pesquisa.component.css']
})
export class CozinhasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CozinhaFiltro();
  cozinhas = [];
  cozinhaId: number;

  @ViewChild('tabela', {static: true}) grid: Table;

  constructor(
    private cozinhaService: CozinhaService,
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de cozinhas');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.cozinhaService.pesquisar(this.filtro)
      .then((resultado: any) => {
        this.totalRegistros = resultado.total;
        this.cozinhas = resultado.cozinhas;
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.itensPorPagina = event.rows;
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(cozinha: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(cozinha);
      }
    });
  }

  excluir(cozinha: any) {
    this.cozinhaService.excluir(cozinha.id)
    .then(() => {
      this.grid.reset();
      this.toasty.success('Cozinha excluida com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
