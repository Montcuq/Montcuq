import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './components/accueil/accueil.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import {WeatherComponent} from "./components/weather/weather.component";

const routes: Routes = [
    {
        path: 'accueil', component: AccueilComponent,
        children: [
            {path: 'auth/login', component: LoginComponent},
            {path: 'auth/signup', component: SignupComponent},
            {path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]},
            {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
            {path: '**', redirectTo: 'auth/login'},
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
