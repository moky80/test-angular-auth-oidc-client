/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

const DEFAULT_UNAUTHENTICATED_RESPONSE: any = {
  configId: null,
  isAuthenticated: false,
  userData: null,
};
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'a19';
  private readonly oidcSecurityService = inject(OidcSecurityService);
  authenticatedResponse = DEFAULT_UNAUTHENTICATED_RESPONSE;
  ngOnInit() {
    this.checkAuth();
  }
  checkAuth() {
    this.oidcSecurityService
    .checkAuthMultiple()
    .subscribe((loginResponses: LoginResponse[]) => {
      console.log('---loginResponses', loginResponses);
      this.authenticatedResponse = loginResponses.find((loginResponse) => loginResponse?.isAuthenticated===true) || DEFAULT_UNAUTHENTICATED_RESPONSE;
    });
  }
  login(configIg: string) {
    this.oidcSecurityService.authorize(configIg);
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

    // The following is from the oidc-client-angular library's README.
    // https://www.npmjs.com/package/angular-auth-oidc-client
    // https://github.com/damienbod/angular-auth-oidc-client
    // At first, it didn't work: Cognito reported "Missing required parameter client_id in request URL."
    // After adding the customParamsEndSessionRequest in the auth.config.ts, it worked.
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => {
        console.log('logoutResponse:', result);
        if (this.authenticatedResponse.configId=== 'google') {
          // logoff does not work for Google:
          // https://github.com/damienbod/angular-auth-oidc-client/issues/1744
          // google identity provider does not support logout, can't fix this on the client.
          // Clear the session storage and reload the page to have the logout effect.
          if (window.sessionStorage) {
            window.sessionStorage.clear();
          }
          window.location.reload();
        }
      });
  }
  isAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated();
  }
  userData(): Observable<any> {
    return this.oidcSecurityService.getUserData();
  }
  accessToken(): Observable<any>{
    return this.oidcSecurityService.getAccessToken();
  }
  decodedAccessToken(): Observable<any>{
    return this.oidcSecurityService.getPayloadFromAccessToken();
  }
  refreshToken(): Observable<any>{
    return this.oidcSecurityService.getRefreshToken();
  }
}
