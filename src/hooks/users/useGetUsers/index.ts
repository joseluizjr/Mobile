import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { type types, usersFetch, usersKeys } from '@/services/users';

export function useGetUsers(params: types.UserParams): UseQueryResult<types.ResponseUsers, Error> {
  return useQuery<types.ResponseUsers>({
    queryKey: [usersKeys.getUsers, params],
    queryFn: async () => {
      return await usersFetch.getUsers(params);
    },
  });
}
