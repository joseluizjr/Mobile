import { format } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetUsersByType } from '@/hooks/users/useGetUsersByType';
import { ROUTES } from '@/routes/const';
import { EmptyTemplate } from '@/template/emptyTemplate';
import { ErrorTemplate } from '@/template/errorTemplate';
import { translateGender } from '@/utils/translateGender';
import { translateStatus } from '@/utils/translateStatus';

import { ActionPatient } from './action';

export function ListPatients() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetUsersByType({
    type: 'PATIENT',
    page: 0,
    size: 20,
  });

  const renderContent = useMemo(() => {
    if (isLoading) return <Loading />;
    if (isError) return <ErrorTemplate title={error.message} />;
    if (!data?.content?.length) return <EmptyTemplate title="Nenhum paciente encontrado" />;
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data de nascimento</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.cpf}</TableCell>
              <TableCell>{patient.birthDate ? format(patient.birthDate, 'dd/MM/yyyy') : '-'}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{translateGender(patient.gender)}</TableCell>
              <TableCell>{translateStatus(patient.status)}</TableCell>
              <TableCell>
                <ActionPatient user={patient} />
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
        <h2 className="text-2xl text-med-green">Listagem de Pacientes</h2>
        <div>
          <Button
            onClick={() => navigate(ROUTES.PATIENTS.create)}
            className="bg-med-green hover:bg-med-green hover:opacity-75 flex items-center gap-2"
          >
            Cadastrar paciente
          </Button>
        </div>
      </div>

      <div className="mt-6">{renderContent}</div>
    </>
  );
}
