import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { type types, usersFetch, usersKeys } from '@/services/users';

export function useUpdateUser() {
  const { mutate, isPending } = useMutation({
    mutationKey: [usersKeys.updateUser],
    mutationFn: async (body: types.UpdateUserParams) => {
      return await usersFetch.updateUser(body);
    },
  });

  return {
    updateUser: mutate as UseMutateFunction<types.ResponseUpdateOrCreateUser, Error, types.UpdateUserParams>,
    isLoading: isPending,
  };
}
