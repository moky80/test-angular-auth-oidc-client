import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_2VghMWgNT',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: '61pt8jclur25fd1ofh116kp8m5',
    scope: 'phone openid email', // 'openid profile offline_access ' + your scopes
    responseType: 'code', // Authorization Code Flow
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug, // Enable debug logs
  }
}
