import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public playerService: PlayerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.playerService.token;
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }
}
