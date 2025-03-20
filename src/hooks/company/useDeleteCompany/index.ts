/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useDeleteCompany() {
  const { mutate, isPending } = useMutation({
    mutationKey: [companiesKeys.deleteCompany],
    mutationFn: async (body: types.ParamsID) => {
      return await companiesFetch.deleteCompany(body);
    },
  });

  return {
    deleteCompany: mutate as UseMutateFunction<any, Error, types.ParamsID>,
    isLoading: isPending,
  };
}
