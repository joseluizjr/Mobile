import axios, { AxiosInstance } from 'axios';

// Tipagem para as URLs base
export const BASE_URLS: Record<string, string | undefined> = {
  KEYCLOAK: process.env.BASE_URL_KEYCLOAK,
  MED: process.env.BASE_URL_MED,
};

// Função para criar instâncias Axios
const createApiInstance = (baseURL?: string): AxiosInstance => {
  if (!baseURL) {
    throw new Error('Base URL is not defined');
  }
  return axios.create({ baseURL });
};

// Tipagem para as instâncias de API
interface ApiInstances {
  keycloakApi: AxiosInstance;
  medApi: AxiosInstance;
}

// Criação das instâncias de API
export const apiInstances: ApiInstances = {
  keycloakApi: createApiInstance(BASE_URLS.KEYCLOAK),
  medApi: createApiInstance(BASE_URLS.MED),
};

// Exportação de APIs individuais (opcional)
export const { keycloakApi, medApi } = apiInstances;
