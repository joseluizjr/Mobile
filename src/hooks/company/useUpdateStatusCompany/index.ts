/* eslint-disable @typescript-eslint/no-explicit-any */

import { UseMutateFunction, useMutation } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useUpdateStatusCompany() {
  const { mutate, isPending } = useMutation({
    mutationKey: [companiesKeys.updateStatusCompany],
    mutationFn: async (body: types.ParamsUpdateStatusCompany) => {
      return await companiesFetch.updateStatusCompany(body);
    },
  });

  return {
    updateStatusCompany: mutate as UseMutateFunction<any, Error, types.ParamsUpdateStatusCompany>,
    isLoading: isPending,
  };
}
