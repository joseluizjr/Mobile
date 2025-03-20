import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useGetCompanies(params: types.CompanyParams): UseQueryResult<types.ResponseGetCompanies, Error> {
  return useQuery<types.ResponseGetCompanies>({
    queryKey: [companiesKeys.getCompanies, params],
    queryFn: async () => {
      return await companiesFetch.getCompanies(params);
    },
  });
}
