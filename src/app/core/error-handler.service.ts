import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from './../seguranca/money-http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router
    ) { }

  handle(errorResponse) {

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    }

    else if (errorResponse.error instanceof ErrorEvent) {
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        msg = errorResponse.error.userMessage;
      } catch (e) { }

    } else {
      msg = errorResponse.error.userMessage;

    }

    this.toasty.error(msg);

  }
}
