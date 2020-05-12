import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeCadastroComponent } from './cidade-cadastro/cidade-cadastro.component';
import { CidadesPesquisaComponent } from './cidades-pesquisa/cidades-pesquisa.component';



@NgModule({
  declarations: [CidadeCadastroComponent, CidadesPesquisaComponent],
  imports: [
    CommonModule
  ]
})
export class CidadesModule { }
