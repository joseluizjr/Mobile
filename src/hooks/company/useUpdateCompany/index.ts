import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useUpdateCompany() {
  const { mutate, isPending } = useMutation({
    mutationKey: [companiesKeys.updateCompany],
    mutationFn: async (body: types.BodyUpdateCompany) => {
      return await companiesFetch.updateCompany(body);
    },
  });

  return {
    updateCompany: mutate as UseMutateFunction<types.Company, Error, types.BodyUpdateCompany>,
    isLoading: isPending,
  };
}
