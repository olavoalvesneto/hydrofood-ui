import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_RESTAURANTES'] }
  },
  {
    path: 'produtos/novo',
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_RESTAURANTES'] }
   },
  {
    path: 'produtos/:id',
    component: ProdutoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_RESTAURANTES'] }
   },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
