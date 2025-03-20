import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { companiesFetch, companiesKeys, type types } from '@/services/company';

export function useGetCompanyById({ id }: types.ParamsID): UseQueryResult<types.ResponseGetCompanyById, Error> {
  return useQuery<types.ResponseGetCompanyById>({
    queryKey: [companiesKeys.getCompanyById, id],
    queryFn: async () => {
      return await companiesFetch.getCompanyById({ id });
    },
    enabled: !!id,
  });
}
