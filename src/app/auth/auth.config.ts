import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_74F2Q9zgh',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: '7e7si6l8sa9tdvoe7plrhe506',
    scope: 'phone openid email profile', // 'openid profile offline_access ' + your scopes
    responseType: 'code', // Authorization Code Flow
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug, // Enable debug logs
    customParamsEndSessionRequest: {
      client_id: '7e7si6l8sa9tdvoe7plrhe506',
      logout_uri: window.location.origin,
    }
  }
}
