import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '@shared/services';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPageComponent', () => {
  let spectator: Spectator<LoginPageComponent>;
  let authService: AuthService;
  let router: Router;

  const createComponent = createComponentFactory({
    component: LoginPageComponent,
    imports: [
      ReactiveFormsModule,
      CardModule,
      ButtonModule,
      InputTextModule,
      HttpClientTestingModule,
    ],
    mocks: [AuthService, Router],
  });

  beforeEach(() => {
    spectator = createComponent();
    authService = spectator.inject(AuthService);
    router = spectator.inject(Router);
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have a form with email and password fields', () => {
    const emailInput = spectator.query('input[formControlName="email"]');
    const passwordInput = spectator.query('input[formControlName="password"]');
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should not call authService.login if form is invalid', () => {
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValue(of({token: 'sdsadfasfdsafsa'}));

    spectator.click('button[type="submit"]');

    expect(loginSpy).not.toHaveBeenCalled();
  });
});
