import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public playerService: PlayerService,
              private state: StateService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.playerService.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.state.part$.subscribe(
                (part) => {
                    this.router.navigate(['/accueil/auth/login']);
                }
              );
            }
            observer.next(true);
          }
        );
      }
    );
  }
}
