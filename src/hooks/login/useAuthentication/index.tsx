import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/routes/const';
import { authorizationFetch, authorizationKeys, type types } from '@/services/authorization';

export function useAuthentication() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getToken } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: [authorizationKeys.getKeycloakAccessToken],
    mutationFn: async (variables: types.AuthorizationParams) => {
      return await authorizationFetch.getKeycloakAccessToken(variables);
    },
    onSuccess: (data: types.AuthorizationResponse) => {
      getToken(data.access_token, data.refresh_token);
      navigate(ROUTES.WELCOME_PAGE);
    },
    onError: () => {
      return toast({
        variant: 'destructive',
        title: 'Erro ao realizar o login',
      });
    },
  });

  function handleSingin(data: types.AuthorizationParams) {
    mutate(data);
  }

  return {
    handleSingin,
    isLoading: isPending,
  };
}
