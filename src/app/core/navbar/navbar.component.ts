import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) {}
  exibindoMenu = false;

  ngOnInit() {

  }

}
