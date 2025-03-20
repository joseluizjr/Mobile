import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '@/components/ui/loading';
import { useGetCompanyById } from '@/hooks/company/useGetCompanyById';
import { CompanyForm } from '@/template/companyForm';
import { ErrorTemplate } from '@/template/errorTemplate';
export function EditCompany() {
  const { id } = useParams();

  const { data: company, isLoading, isError, error } = useGetCompanyById({ id: id ?? '' });

  const renderContent = useMemo(() => {
    if (isLoading) return <Loading />;

    if (isError) return <ErrorTemplate title={error.message} />;

    return <CompanyForm id={id} company={company} />;
  }, [isLoading, isError, error, company, id]);

  return renderContent;
}
