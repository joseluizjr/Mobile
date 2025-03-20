import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useCreateCompany() {
  const { mutate, isPending } = useMutation({
    mutationKey: [companiesKeys.createCompany],
    mutationFn: async (body: types.BodyCreateCompany) => {
      return await companiesFetch.createCompany(body);
    },
  });

  return {
    createCompany: mutate as UseMutateFunction<types.Company, Error, types.BodyCreateCompany>,
    isLoading: isPending,
  };
}
