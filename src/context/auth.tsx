import { jwtDecode } from 'jwt-decode';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { keycloakApi, medApi } from '@/libs/axios';
import { ROUTES } from '@/routes/const';
import { type TUser } from '@/services/authorization/types';
import { allowedRoutes, clearStorage } from '@/utils/clearCache';

interface AuthContextProps {
  getToken: (token: string, refreshToken: string) => void;
  token: string;
  isAuthenticated: boolean;
  user: TUser | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const apis = [keycloakApi, medApi];

const configureInterceptors = (apiInstances: (typeof keycloakApi)[]) => {
  apiInstances.forEach((api) => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          clearStorage();
        }
        return Promise.reject(error);
      },
    );
  });
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<TUser | null>(() => {
    const token = localStorage.getItem('@med_signin_token');
    return token ? jwtDecode<TUser>(token) : null;
  });

  function getToken(token: string, refreshToken: string) {
    localStorage.setItem('@med_signin_token', token);
    localStorage.setItem('@med_signin_refresh_token', refreshToken);

    const decodedUser = jwtDecode<TUser>(token);
    localStorage.setItem('@med_user', JSON.stringify(decodedUser));

    setUser(decodedUser);

    apis.forEach((api) => {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    });

    setToken(token);
  }

  useEffect(() => {
    const localStorageToken = localStorage.getItem('@med_signin_token');
    const localRefreshToken = localStorage.getItem('@med_signin_refresh_token');
    const localUser = localStorage.getItem('@med_user');

    if (localStorageToken && localRefreshToken && localUser) {
      const parsedUser: TUser = JSON.parse(localUser);

      setToken(localStorageToken);
      setUser(parsedUser);

      apis.forEach((api) => {
        api.defaults.headers.common.Authorization = `Bearer ${localStorageToken}`;
      });

      configureInterceptors(apis);

      if (allowedRoutes.includes(window.location.pathname)) {
        navigate(ROUTES.WELCOME_PAGE);
      }
    } else {
      clearStorage();
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        getToken,
        token,
        isAuthenticated: !!user,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
