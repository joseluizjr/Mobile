import { useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useDeleteCompany } from '@/hooks/company/useDeleteCompany';
import { useUpdateStatusCompany } from '@/hooks/company/useUpdateStatusCompany';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/libs/react-query';
import { ROUTES } from '@/routes/const';
import { companiesKeys, types } from '@/services/company';
import { ModalConfirmation } from '@/template/modalConfirmation';

interface IActionCompany {
  company?: types.Company;
}

const INITIAL_MODAL_STATE = {
  open: false,
  title: '',
  description: '',
  onSubmitForm: () => {},
  textButtonSave: '',
};

export function ActionCompany({ company }: IActionCompany) {
  const { toast } = useToast();
  const [modal, setModal] = useState(INITIAL_MODAL_STATE);

  const navigate = useNavigate();

  const { deleteCompany, isLoading: isLoadingDelete } = useDeleteCompany();
  const { updateStatusCompany, isLoading: isLoadingUpdateStatus } = useUpdateStatusCompany();

  const isLoading = isLoadingDelete || isLoadingUpdateStatus;

  const handleDelete = () => {
    setModal({
      open: true,
      title: 'Excluir empresa',
      description: 'Deseja excluir este registro?',
      textButtonSave: 'Deletar',
      onSubmitForm: () =>
        deleteCompany(
          { id: company?.id ?? '' },
          {
            onSuccess: () => {
              toast({ title: 'Empresa excluída com sucesso!', variant: 'success' });
              queryClient.invalidateQueries({
                queryKey: [companiesKeys.getCompanies],
              });
            },
            onError: (error) => {
              toast({ title: `Erro ao excluir empresa: ${error.message}`, variant: 'destructive' });
            },
          },
        ),
    });
  };

  const handleUpdateStatus = () => {
    setModal({
      open: true,
      title: company?.status === 'ACTIVE' ? 'Inativar empresa' : 'Ativar empresa',
      description: `Deseja ${company?.status === 'ACTIVE' ? 'inativar' : 'ativar'} esta empresa?`,
      textButtonSave: company?.status === 'ACTIVE' ? 'Inativar' : 'Ativar',
      onSubmitForm: () => {
        updateStatusCompany(
          { id: company?.id ?? '', status: company?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
          {
            onSuccess: () => {
              toast({
                title: `${company?.status === 'ACTIVE' ? 'Empresa inativada' : 'Empresa ativada'} com sucesso!`,
                variant: 'success',
              });
              queryClient.invalidateQueries({
                queryKey: [companiesKeys.getCompanies],
              });
              setModal(INITIAL_MODAL_STATE);
            },
            onError: (error) => {
              toast({
                title: `Erro ao ${company?.status === 'ACTIVE' ? 'inativar' : 'ativar'} empresa: ${error.message}`,
                variant: 'destructive',
              });
            },
          },
        );
      },
    });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <AiOutlineMore size={24} className="cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-full p-2">
          <ul className="flex flex-col gap-2 justify-start items-center">
            <li>
              <Button onClick={() => navigate(`${ROUTES.COMPANY.edit}/${company?.id}`)} variant="link" type="button">
                Editar
              </Button>
            </li>
            <li>
              <Button onClick={handleDelete} variant="link" type="button">
                Deletar
              </Button>
            </li>
            <li>
              <Button onClick={handleUpdateStatus} variant="link" type="button">
                {company?.status === 'ACTIVE' ? 'Inativar' : 'Ativar'}
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      <ModalConfirmation
        open={modal.open}
        title={modal.title}
        description={modal.description}
        isLoading={isLoading}
        onOpenChange={() => setModal(INITIAL_MODAL_STATE)}
        onSubmitForm={modal.onSubmitForm}
        textButtonSave={modal.textButtonSave}
      />
    </>
  );
}
