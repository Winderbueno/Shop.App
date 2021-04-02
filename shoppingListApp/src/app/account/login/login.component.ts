//#region Angular and RxJS Module
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//#endregion

//#region Model and Service
import { Account } from '@app/_shared/model/account.model';
import { AuthenticationService } from '@app/_shared/service/authentication.service';
import { AlertService } from '@app/_shared/service/alert.service';
//#endregion

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit {

  loggedInAccount: Account | undefined;

  // Form
  form!: FormGroup;
  submitted = false;
  loading = false;

  // Form controls getter
  get f() { return this.form.controls; }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authentService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // Form definition
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {

    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) { return; }
    
    this.loading = true;
    this.authentService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // Get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  getEmailError() {
    let emailCtrl = this.f.email;
    return emailCtrl.hasError('required') ? 'Veuillez entrer votre adresse email' :
      emailCtrl.hasError('email') ? 'L\'email saisi n\'est pas au bon format' : '';
  }

  getPasswordError() {
    let emailCtrl = this.f.password;
    return emailCtrl.hasError('required') ? 'Veuillez saisir un mot de passe' : '';
  }
}
