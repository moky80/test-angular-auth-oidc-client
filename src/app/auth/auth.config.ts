import { PassedInitialConfig, LogLevel } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: [
    {
      configId: 'cognito',
      authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_74F2Q9zgh',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: '7e7si6l8sa9tdvoe7plrhe506',
      scope: 'phone openid email profile',
      responseType: 'code', // Authorization Code Flow with Proof Key for Code Exchange (PKCE)
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: LogLevel.Debug, // Enable debug logs
      customParamsEndSessionRequest: {
        client_id: '7e7si6l8sa9tdvoe7plrhe506',
        logout_uri: window.location.origin,
      }
    },
    {
      configId: 'google',
      authority: 'https://accounts.google.com',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: "206397179491-f4qcp8q8qk07hbhod81os0i01afbmab7.apps.googleusercontent.com",
      scope: 'openid email profile',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: LogLevel.Debug,
      autoUserInfo: true, // Fetch user information automatically
      customParamsCodeRequest: {
        /* client_secret: "dummy", TODO - NOT acceptable in production!!! */
      }
    },
    {
      // https://github.com/damienbod/angular-auth-oidc-client/issues/1826#issuecomment-2563089224
      configId: 'facebook',
      authority: 'https://facebook.com',
      // override the default well-known endpoint to workaround CORS error from the
      // default OIDC discovery endpoint https://facebook.com/.well-known/openid-configuration
      authWellknownEndpointUrl: `${window.location.origin}/assets`,
      authWellknownUrlSuffix: '', // override the default well-known url suffix
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: "3849494948641276",
      scope: 'public_profile email openid',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
      logLevel: LogLevel.Debug,
      autoUserInfo: true,
    }
  ]
}
