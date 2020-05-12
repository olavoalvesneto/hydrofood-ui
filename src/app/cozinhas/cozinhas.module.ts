import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from './../shared/shared.module';
import { CozinhasPesquisaComponent } from './cozinhas-pesquisa/cozinhas-pesquisa.component';
import { CozinhaCadastroComponent } from './cozinha-cadastro/cozinha-cadastro.component';
import { CozinhasRoutingModule } from './cozinhas-routing.module';

@NgModule({
  declarations: [CozinhasPesquisaComponent, CozinhaCadastroComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    TableModule,

    SharedModule,
    CozinhasRoutingModule
  ],
  exports: []
})
export class CozinhasModule { }
