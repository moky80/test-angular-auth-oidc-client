import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'a19';
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private bAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$;
  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;
        console.log('loginResponse:', loginResponse);
        this.bAuthenticated = isAuthenticated
        /*...*/
      });
  }
  login() {
    this.oidcSecurityService.authorize();
  }
  logout() {
    // The following is from AWS quick setup guide for Angular and worked.
    // https://eu-central-1.console.aws.amazon.com/cognito/v2/idp/set-up-your-application?region=eu-central-1
    /*
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    window.location.href = "https://eu-central-12vghmwgnt.auth.eu-central-1.amazoncognito.com/logout?client_id=61pt8jclur25fd1ofh116kp8m5&logout_uri=https://localhost:4444";
    */

    // The following is from the oidc-client-angular library's README and did not work.
    // https://www.npmjs.com/package/angular-auth-oidc-client
    // https://github.com/damienbod/angular-auth-oidc-client
    // Cognito reported "Missing required parameter client_id in request URL."
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => {
        console.log('logoutResponse:', result);
      });
  }
  isAuthenticated(){
    return this.bAuthenticated;
  }
}
