import { keycloakApi } from '@/libs/axios';

import { endpoints } from './endpoints';
import * as authTypes from './types';

class AuthorizationFetch {
  async getKeycloakAccessToken({ username, password }: authTypes.AuthorizationParams) {
    const data = new URLSearchParams();
    data.append('client_id', 'med_front_client');
    data.append('grant_type', 'password');
    data.append('username', username);
    data.append('password', password);
    data.append('scope', 'openid');

    const res = await keycloakApi.post<authTypes.AuthorizationResponse>(endpoints.getKeycloakAccessToken(), data);
    return res.data;
  }
}

const authorizationFetch = new AuthorizationFetch();

export default authorizationFetch;
