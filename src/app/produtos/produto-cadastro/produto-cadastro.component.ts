import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { ProdutoService } from './../produto.service';
import { Produto } from './../../core/model';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  produto = new Produto();
  constructor(
    private produtoService: ProdutoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
  }

  get editando() {
    return Boolean(this.produto.id);
  }

  salvar(form: NgForm) {
    if (this.editando){
      this.atualizarProduto(form);
    }else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: NgForm) {
    console.log(this.produto.nome);
    console.log(this.produto.ativo);
    this.produto.ativo = true;
    console.log(this.produto.ativo);
    this.produtoService.adicionar(this.produto)
    .then(cozinhaAdicionada => {
      this.toasty.success('Produto adicionado com sucesso!');
      this.router.navigate(['/produtos', cozinhaAdicionada.id]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: NgForm) {
    this.produtoService.atualizar(this.produto)
    .then(cozinha => {
      this.produto = cozinha;
      this.toasty.success('Produto atualizada com sucesso"');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Produto: ${this.produto.nome}`);
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CozinhaService } from './../cozinha.service';
import { Cozinha, Produto } from './../../core/model';
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
 */
