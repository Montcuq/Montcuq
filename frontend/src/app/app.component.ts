import {Component, HostListener} from '@angular/core';
import { PlayerService } from './services/player.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  socket: any;

  constructor(private playerService: PlayerService,
              private router: Router) {
  }

  title = 'app';

  ngOnInit() {
    this.socket = this.playerService
        .onDisconnectionPlayer()
        .subscribe((player) => {
          if (player.userId === this.playerService.userId && player.date === this.playerService.date){
            this.playerService.userId = null;
            this.playerService.date = null;
            this.playerService.connected = null;
            this.playerService.logout();
            this.router.navigate(['/accueil/auth/login']);
          }
        });
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    this.playerService.emitRemovePlayer();
  }
}
