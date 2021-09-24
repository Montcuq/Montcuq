import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serverAddress } from '../../environments/environment.prod'


@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string;
    userId: string;
    pseudo: string = '';
    date: any = null;



    constructor(private router: Router,
                private route: ActivatedRoute,
                private http: HttpClient) {
    }

    // User
    createNewUser(pseudo: string, email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post(
                (serverAddress + '/api/auth/signup'),
                {pseudo: pseudo, email: email, password: password})
                .subscribe(
                    () => {
                        this.login(pseudo, password).then(
                            () => {
                                resolve();
                            }
                        ).catch(
                            (error) => {
                                reject(error);
                            }
                        );
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    login(pseudo: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post(
                (serverAddress + '/api/auth/login'),
                {pseudo: pseudo, password: password})
                .subscribe(
                    (response) => {
                        this.isAuth$.next(true);
                        // @ts-ignore
                        this.userId = response.userId; this.pseudo = response.pseudo;  this.token = response.token;  localStorage.setItem("acc", response.token);
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    }

    logout() {
        this.isAuth$.next(false);
        this.token = null;
    }
}
