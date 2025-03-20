import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavPagination } from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetCompanies } from '@/hooks/company/useGetCompanies';
import { ROUTES } from '@/routes/const';
import { EmptyTemplate } from '@/template/emptyTemplate';
import { ErrorTemplate } from '@/template/errorTemplate';
import { translateStatus } from '@/utils/translateStatus';

import { ActionCompany } from './action';

export function ListCompanies() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { isLoading, isError, data, error } = useGetCompanies({
    page: currentPage,
    size: 20,
  });

  const hasPagination = data && data.totalPages !== undefined && data.totalPages > 1;

  function onPageChangeNavigation(page: number) {
    setCurrentPage(page);
  }

  const renderContent = useMemo(() => {
    if (isLoading) return <Loading />;
    if (isError) return <ErrorTemplate title={error.message} />;
    if (!data?.content?.length) return <EmptyTemplate title="Nenhuma empresa encontrada" />;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Tipo de empresa</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.cnpj}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>{company.companyType}</TableCell>
              <TableCell>{company.address.city}</TableCell>
              <TableCell>{company.address.state}</TableCell>
              <TableCell>{translateStatus(company.status)}</TableCell>
              <TableCell>
                <ActionCompany company={company} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }, [isLoading, isError, data, error]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-med-green">Listagem de Empresas</h2>
        <div>
          <Button
            onClick={() => navigate(ROUTES.COMPANY.create)}
            className="bg-med-green hover:bg-med-green hover:opacity-75 flex items-center gap-2"
          >
            Cadastrar empresa
          </Button>
        </div>
      </div>

      <ScrollArea className="mt-6 h-[calc(100vh-250px)]">{renderContent}</ScrollArea>
      {hasPagination && (
        <div className="flex px-2 pb-4 w-full mt-4">
          <NavPagination currentPage={currentPage} totalPages={data.totalPages} onPageChange={onPageChangeNavigation} />
        </div>
      )}
    </>
  );
}
