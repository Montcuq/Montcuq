import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private state: StateService,
              public playerService: PlayerService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.loginForm = this.formBuilder.group({
      pseudo: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loading = true;
    const pseudo = this.loginForm.get('pseudo').value;
    const password = this.loginForm.get('password').value;
    this.playerService.login(pseudo, password).then(
      () => {
        this.loading = false;
        this.router.navigate(['/accueil/rooms']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
