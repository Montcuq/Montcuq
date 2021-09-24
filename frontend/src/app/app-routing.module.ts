import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { RoomsComponent } from './rooms/rooms.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
    {
        path: 'accueil', component: AccueilComponent,
        children: [
            {path: 'auth/login', component: LoginComponent},
            {path: 'auth/signup', component: SignupComponent},
            {path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard]},
            {path: 'waitingRoom/:name', component: WaitingRoomComponent, canActivate: [AuthGuard]},
            {path: 'game/:name', component: GameComponent, canActivate: [AuthGuard]},
            {path: '', pathMatch: 'full', redirectTo: 'rooms'},
            {path: '**', redirectTo: 'rooms'}
        ]
    },
    {path: 'default', redirectTo: 'accueil'},
    {path: '', pathMatch: 'full', redirectTo: 'accueil'},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule {
}
