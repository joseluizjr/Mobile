import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { type types, usersFetch, usersKeys } from '@/services/users';

export function useGetUserById(params: types.ParamsID): UseQueryResult<types.User, Error> {
  return useQuery<types.User>({
    queryKey: [usersKeys.getUserById, params],
    queryFn: async () => {
      return await usersFetch.getUserById(params);
    },
    enabled: !!params.id,
  });
}
