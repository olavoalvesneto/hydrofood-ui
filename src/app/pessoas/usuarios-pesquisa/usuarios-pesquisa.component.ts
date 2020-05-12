import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-pesquisa',
  templateUrl: './usuarios-pesquisa.component.html',
  styleUrls: ['./usuarios-pesquisa.component.css']
})
export class UsuariosPesquisaComponent implements OnInit {
  usuarios = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.usuarioService.listarTodas().then((data: any) => {
      console.log(data);
      this.usuarios = data;
    });
  }

  excluir(usuario: any) {
    this.usuarioService.excluir(usuario.id)
      .then(() => {
        console.log('Excluido');
      });
  }

}
