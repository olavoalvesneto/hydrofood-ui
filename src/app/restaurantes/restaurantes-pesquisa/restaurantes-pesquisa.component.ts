import { RestauranteService } from './../restaurante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurantes-pesquisa',
  templateUrl: './restaurantes-pesquisa.component.html',
  styleUrls: ['./restaurantes-pesquisa.component.css']
})
export class RestaurantesPesquisaComponent implements OnInit {
  restaurantes: [];

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.restauranteService.listarTodas().then((data: any) => {
      console.log(data);
      this.restaurantes = data;
    });
  }

  ativar(restaurante: any) {
    this.restauranteService.ativar(restaurante.id)
      .then(() => {
        console.log('Ativo');
      });
  }

  inativar(restaurante: any) {
    this.restauranteService.inativar(restaurante.id)
      .then(() => {
        console.log('Inativado');
      });
  }

  abrir(restaurante: any) {
    this.restauranteService.abrir(restaurante.id)
      .then(() => {
        console.log('Aberto');
      });
  }

  fechar(restaurante: any) {
    this.restauranteService.fechar(restaurante.id)
      .then(() => {
        console.log('Aberto');
      });
  }

}
