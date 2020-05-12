import { ProdutosPesquisaComponent } from './produtos/produtos-pesquisa/produtos-pesquisa.component';
import { RestaurantesPesquisaComponent } from './restaurantes/restaurantes-pesquisa/restaurantes-pesquisa.component';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { UsuariosPesquisaComponent } from './pessoas/usuarios-pesquisa/usuarios-pesquisa.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosPesquisaComponent },
  { path: 'restaurantes', component: RestaurantesPesquisaComponent },
  { path: 'produtos', component: ProdutosPesquisaComponent },


  { path: '', redirectTo: 'cozinhas', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
