export interface AuthorizationParams {
  username: string;
  password: string;
}

export interface AuthorizationResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

export enum TypeEnum {
  ADMINISTRATOR = '/ADMINISTRATOR',
  SUPERVISOR = '/SUPERVISOR',
}

export interface TUser {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: {
    'admin-cli': {
      roles: TypeEnum[];
    };
    account: {
      roles: string[];
    };
  };
  scope: string;
  sid: string;
  service_channel: string[];
  user_group: string[];
  email_verified: true;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
  roles: TypeEnum[];
}

export type LogoutParams = {
  userId: string;
};
