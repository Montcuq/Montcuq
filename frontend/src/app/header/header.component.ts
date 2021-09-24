import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state.service';
import { PlayerService } from '../services/player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public mode: string;
  public part: number;
  public partString: string;
  public isAuth: boolean;

  private modeSub: Subscription;
  private partSub: Subscription;
  private isAuthSub: Subscription;

  constructor(private state: StateService,
              public playerService: PlayerService,
              private router: Router) { }

  ngOnInit() {
    this.modeSub = this.state.mode$.subscribe(
      (mode) => {
        this.mode = mode;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
        this.partString = 'accueil';
      }
    );
    this.isAuthSub = this.playerService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.playerService.logout();
    this.router.navigate(['/' + this.partString + '/auth/login']);
  }

  onBackToParts() {
    this.router.navigate(['/default']);
  }

  ngOnDestroy() {
    this.modeSub.unsubscribe();
    this.partSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }

}
