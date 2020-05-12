import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxCurrencyModule } from 'ngx-currency'

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';

import { SharedModule } from './../shared/shared.module';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';

registerLocaleData(br, 'pt-BR');
@NgModule({
  declarations: [ProdutosPesquisaComponent, ProdutoCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    TableModule,
    InputSwitchModule,
    NgxCurrencyModule,

    SharedModule,
    ProdutosRoutingModule
  ],
  exports: []
})
export class ProdutosModule { }
