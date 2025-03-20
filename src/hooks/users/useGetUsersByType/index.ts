import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { type types, usersFetch, usersKeys } from '@/services/users';

export function useGetUsersByType(params: types.TypeUsersParams): UseQueryResult<types.ResponseUsers, Error> {
  return useQuery<types.ResponseUsers>({
    queryKey: [usersKeys.getTypeUsers, params],
    queryFn: async () => {
      return await usersFetch.getTypeUsers(params);
    },
  });
}
