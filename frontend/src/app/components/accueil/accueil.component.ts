import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, OnDestroy {

  constructor(private state: StateService,
              public playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.isAuth$.next(false);
    this.playerService.userId = '';
    this.playerService.token = '';
    this.state.part$.next(4);
    this.state.part = 4;
  }

  ngOnDestroy() {
  }
}
