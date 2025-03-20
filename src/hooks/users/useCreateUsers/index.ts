import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { type types, usersFetch, usersKeys } from '@/services/users';

export function useCreateUser() {
  const { mutate, isPending } = useMutation({
    mutationKey: [usersKeys.createUser],
    mutationFn: async (body: types.BodyParams) => {
      return await usersFetch.createUser(body);
    },
  });

  return {
    createUser: mutate as UseMutateFunction<types.ResponseUpdateOrCreateUser, Error, types.BodyParams>,
    isLoading: isPending,
  };
}
