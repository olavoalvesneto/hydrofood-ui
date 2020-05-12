import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { CozinhaCadastroComponent } from './cozinha-cadastro/cozinha-cadastro.component';
import { CozinhasPesquisaComponent } from './cozinhas-pesquisa/cozinhas-pesquisa.component';

const routes: Routes = [
  {
    path: 'cozinhas',
    component: CozinhasPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_COZINHAS'] }
  },
  {
    path: 'cozinhas/nova',
    component: CozinhaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_COZINHAS'] }
   },
  {
    path: 'cozinhas/:id',
    component: CozinhaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['EDITAR_COZINHAS'] }
   },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CozinhasRoutingModule { }
