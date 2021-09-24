import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private state: StateService,
              public playerService: PlayerService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      pseudo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const pseudo = this.signupForm.get('pseudo').value;
      const email = this.signupForm.get('email').value;
      const password = this.signupForm.get('password').value;
      this.playerService.createNewUser(pseudo, email, password).then(
          () => {
            this.loading = false;
            this.router.navigate(['/accueil/accueil-joueur']);
          }
      ).catch(
          (error) => {
            this.loading = false;
            this.errorMessage = error.message;
          }
      );
  }
}
