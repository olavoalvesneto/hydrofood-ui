import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CozinhaService } from './../cozinha.service';
import { Cozinha } from './../../core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cozinha-cadastro',
  templateUrl: './cozinha-cadastro.component.html',
  styleUrls: ['./cozinha-cadastro.component.css']
})
export class CozinhaCadastroComponent implements OnInit {

  cozinha = new Cozinha();
  constructor(
    private cozinhaService: CozinhaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova cozinhas');
    const id = this.route.snapshot.params.id;

    if (id) {
      this.carregarCozinha(id);
    }

  }

  get editando() {
    return Boolean(this.cozinha.id);
  }

  carregarCozinha(id: number) {
    this.cozinhaService.buscarPorCodigo(id)
      .then(cozinha => {
        this.cozinha = cozinha;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    if (this.editando){
      this.atualizarCozinha(form);
    }else {
      this.adicionarCozinha(form);
    }
  }

  adicionarCozinha(form: NgForm) {
    console.log(this.cozinha.nome);
    this.cozinhaService.adicionar(this.cozinha)
    .then(cozinhaAdicionada => {
      this.toasty.success('Cozinha adicionada com sucesso!');
      this.router.navigate(['/cozinhas', cozinhaAdicionada.id]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCozinha(form: NgForm) {
    this.cozinhaService.atualizar(this.cozinha)
    .then(cozinha => {
      this.cozinha = cozinha;
      this.toasty.success('Cozinha atualizada com sucesso"');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.cozinha = new Cozinha();
    }.bind(this), 1);

    this.router.navigate(['/cozinhas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Cozinha: ${this.cozinha.nome}`);
  }

}
