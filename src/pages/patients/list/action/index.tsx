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
import { types, usersKeys } from '@/services/users';
import { ModalConfirmation } from '@/template/modalConfirmation';

interface IActionPatient {
  user?: types.User;
}

const INITIAL_MODAL_STATE = {
  open: false,
  title: '',
  description: '',
  onSubmitForm: () => {},
  textButtonSave: '',
};

export function ActionPatient({ user }: IActionPatient) {
  const { toast } = useToast();
  const [modal, setModal] = useState(INITIAL_MODAL_STATE);

  const navigate = useNavigate();

  const { deleteCompany, isLoading: isLoadingDelete } = useDeleteCompany();
  const { updateStatusCompany, isLoading: isLoadingUpdateStatus } = useUpdateStatusCompany();

  const isLoading = isLoadingDelete || isLoadingUpdateStatus;

  const handleDelete = () => {
    setModal({
      open: true,
      title: 'Excluir paciente',
      description: 'Deseja excluir este paciente?',
      textButtonSave: 'Deletar',
      onSubmitForm: () =>
        deleteCompany(
          { id: user?.id ?? '' },
          {
            onSuccess: () => {
              toast({ title: 'Paciente excluído com sucesso!', variant: 'success' });
              queryClient.invalidateQueries({
                queryKey: [usersKeys.getUsers],
              });
            },
            onError: (error) => {
              toast({ title: `Erro ao excluir paciente: ${error.message}`, variant: 'destructive' });
            },
          },
        ),
    });
  };

  const handleUpdateStatus = () => {
    setModal({
      open: true,
      title: user?.status === 'ACTIVE' ? 'Inativar paciente' : 'Ativar paciente',
      description: `Deseja ${user?.status === 'ACTIVE' ? 'inativar' : 'ativar'} este paciente?`,
      textButtonSave: user?.status === 'ACTIVE' ? 'Inativar' : 'Ativar',
      onSubmitForm: () => {
        updateStatusCompany(
          { id: user?.id ?? '', status: user?.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
          {
            onSuccess: () => {
              toast({
                title: `${user?.status === 'ACTIVE' ? 'Paciente inativado' : 'Paciente ativado'} com sucesso!`,
                variant: 'success',
              });
              queryClient.invalidateQueries({
                queryKey: [usersKeys.getUsers],
              });
              setModal(INITIAL_MODAL_STATE);
            },
            onError: (error) => {
              toast({
                title: `Erro ao ${user?.status === 'ACTIVE' ? 'inativar' : 'ativar'} paciente: ${error.message}`,
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
              <Button onClick={() => navigate(`${ROUTES.PATIENTS.edit}/${user?.id}`)} variant="link" type="button">
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
                {user?.status === 'ACTIVE' ? 'Inativar' : 'Ativar'}
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
