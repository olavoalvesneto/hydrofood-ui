import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';

import { RestaurantesPesquisaComponent } from './restaurantes-pesquisa/restaurantes-pesquisa.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [RestaurantesPesquisaComponent],
  imports: [
    CommonModule,

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

    SharedModule
  ],
  exports: [RestaurantesPesquisaComponent]
})
export class RestaurantesModule { }
