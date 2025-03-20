import { useFieldArray, useForm } from 'react-hook-form';
import { FaCirclePlus, FaTrash } from 'react-icons/fa6';
import { MdCleaningServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useCreateUser } from '@/hooks/users/useCreateUsers';
import { useUpdateUser } from '@/hooks/users/useEditUser';
import { queryClient } from '@/libs/react-query';
import { ROUTES } from '@/routes/const';
import { usersKeys } from '@/services/users';
import { User } from '@/services/users/types';
import { removeEmptyValues } from '@/utils/removeEmptyValues';
import { UFStates } from '@/utils/ufs';

import { CreatePatientFormData, resolverForm } from './validateForm';

interface PatientFormProps {
  patient?: User;
  id?: string;
}

export function PatientForm({ id, patient }: PatientFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createUser, isLoading: isLoadingCreate } = useCreateUser();
  const { updateUser, isLoading: isLoadingUpdate } = useUpdateUser();

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const form = useForm<CreatePatientFormData>({
    resolver: resolverForm,
    defaultValues: {
      imgPhotoUrl: patient?.imgPhotoUrl ?? '',
      name: patient?.name ?? '',
      birthDate: patient?.birthDate ?? '',
      gender: patient?.gender || '',
      cpf: patient?.cpf ?? '',
      email: patient?.email ?? '',
      cns: patient?.cns ?? '',
      status: patient?.status ?? 'ACTIVE',
      address: patient?.address ?? {
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        postalCode: '',
        complement: '',
        reference: '',
      },
      contacts: patient?.contacts ?? [
        {
          type: '',
          description: '',
          value: '',
        },
      ],
      details: patient?.details ?? {
        type: 'PATIENT',
        allergies: '',
        preExistingDiseases: '',
      },
      keycloakGroup: 'USER',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });

  function onSubmit(data: CreatePatientFormData) {
    if (id) {
      updateUser(
        {
          id,
          body: removeEmptyValues(data),
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Paciente atualizado com sucesso!',
            });
            queryClient.invalidateQueries({
              queryKey: [usersKeys.updateUser],
            });
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Erro ao atualizar paciente',
            });
          },
        },
      );
    } else {
      createUser(removeEmptyValues(data), {
        onSuccess: () => {
          form.reset();
          toast({
            variant: 'success',
            title: 'Paciente cadastrado com sucesso!',
          });
          queryClient.invalidateQueries({
            queryKey: [usersKeys.getUsers],
          });
          navigate(ROUTES.PATIENTS.list);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Erro ao cadastrar paciente',
          });
        },
      });
    }
  }

  return (
    <>
      <h2 className="text-2xl text-med-green">{id ? 'Editar Paciente' : 'Cadastro de Paciente'}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <p className="text-lg text-gray-500">Dados Pessoais</p>
            <hr className="mt-2 mb-4" />
            <Label className="flex flex-col gap-4">
              Nome Completo:
              <Input placeholder="Preencha o nome completo do paciente" {...form.register('name')} />
            </Label>
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
              <Label className="flex flex-col gap-4">
                CPF:
                <Input placeholder="Preencha com o CPF do paciente" {...form.register('cpf')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Data de nascimento:
                <Input placeholder="Selecione a data" type="date" {...form.register('birthDate')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Sexo:
                <Select value={form.watch('gender')} onValueChange={(value) => form.setValue('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MALE">Masculino</SelectItem>
                      <SelectItem value="FEMALE">Feminino</SelectItem>
                      <SelectItem value="OTHER">Outro</SelectItem>
                      <SelectItem value="NOT_INFORMED">Prefiro não informar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <Label className="flex flex-col gap-4">
                Email:
                <Input placeholder="Preencha o e-mail do paciente" type="email" {...form.register('email')} />
              </Label>
            </div>
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
              <Label className="flex flex-col gap-4">
                CNS:
                <Input placeholder="Preencha com o CNS do paciente" {...form.register('cns')} />
              </Label>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-500">Contatos</p>
              <hr className="mt-2 mb-4" />
              <div>
                <div className="w-full flex justify-end">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => append({ type: '', description: '', value: '' })}
                    className="flex items-center gap-2"
                  >
                    <FaCirclePlus /> Adicionar novo contato
                  </Button>
                </div>
                {fields.map((field, index) => (
                  <div key={field.id} className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                    <div>
                      <Label className="flex flex-col gap-4">
                        Tipo de Contato
                        <Select
                          value={form.watch(`contacts.${index}.type`)}
                          onValueChange={(value) => form.setValue(`contacts.${index}.type`, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o tipo de contato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PHONE">Telefone</SelectItem>
                            <SelectItem value="CELL_PHONE">Celular</SelectItem>
                          </SelectContent>
                        </Select>
                      </Label>
                    </div>

                    <div>
                      <Label className="flex flex-col gap-4">
                        Descrição
                        <Input
                          type="text"
                          placeholder="Digite uma descrição"
                          {...form.register(`contacts.${index}.description`, {
                            required: 'Descrição é obrigatória',
                          })}
                        />
                      </Label>
                    </div>

                    <div>
                      <Label className="flex flex-col gap-4">
                        {form.watch(`contacts.${index}.type`) === 'PHONE' ? 'Telefone' : 'Celular'}
                        <Input
                          type="tel"
                          placeholder={`Digite o telefone ou ${form.watch(`contacts.${index}.type`) === 'PHONE' ? 'telefone' : 'celular'}`}
                          {...form.register(`contacts.${index}.value`)}
                        />
                      </Label>
                    </div>

                    {fields.length > 1 && (
                      <div className="md:col-span-4 flex justify-end">
                        <Button type="button" size="sm" onClick={() => remove(index)}>
                          <FaTrash />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-500">Endereço</p>
              <hr className="mt-2 mb-4" />
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  Rua:
                  <Input placeholder="Preencha com o nome da rua" {...form.register('address.street')} />
                </Label>
                <Label className="flex flex-col gap-4">
                  Número:
                  <Input placeholder="Preencha com o número da residência" {...form.register('address.number')} />
                </Label>
                <Label className="flex flex-col gap-4">
                  Bairro:
                  <Input placeholder="Preencha com o nome do bairro" {...form.register('address.neighborhood')} />
                </Label>
                <Label className="flex flex-col gap-4">
                  Cidade:
                  <Input placeholder="Preencha com o nome da cidade" {...form.register('address.city')} />
                </Label>
              </div>
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  Estado:
                  <Select
                    value={form.watch('address.state')}
                    onValueChange={(value) => form.setValue('address.state', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {UFStates.map((uf) => (
                          <SelectItem key={uf.uf} value={uf.uf}>
                            {uf.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Label>
                <Label className="flex flex-col gap-4">
                  CEP:
                  <Input placeholder="Preencha com o CEP do endereço" {...form.register('address.postalCode')} />
                </Label>
                <Label className="flex flex-col gap-4">
                  Complemento:
                  <Input
                    placeholder="Preencha com o complemento do endereço"
                    {...form.register('address.complement')}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Referencia:
                  <Input
                    placeholder="Preencha com uma referencia para o local"
                    {...form.register('address.reference')}
                  />
                </Label>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-500">Dados Adicionais</p>
              <hr className="mt-2 mb-4" />
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  Alergias:
                  <Input placeholder="Preencha com o número da carteirinha" {...form.register('details.allergies')} />
                  <p className="text-med-gray-75">Separe as alergias por virgula</p>
                </Label>
                <Label className="flex flex-col gap-4">
                  Doenças pre-existentes:
                  <Input
                    placeholder="Preencha com o convenio do paciente"
                    {...form.register('details.preExistingDiseases')}
                  />
                  <p className="text-med-gray-75">Separe as doenças por virgula</p>
                </Label>
              </div>
            </div>
          </ScrollArea>
          <div className="mt-6 flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              onClick={() => form.reset()}
              className="px-4 py-2 text-med-green flex items-center gap-2 cursor-pointer"
            >
              <MdCleaningServices /> Limpar filtros
            </Button>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(ROUTES.PATIENTS.list)}
                className="px-4 py-2 text-med-green rounded-lg shadow-md hover:bg-med-green-dark"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-med-green text-white rounded-lg shadow-md hover:bg-med-green hover:opacity-75"
              >
                {isLoading ? <Loading type="WHITE" /> : 'Cadastrar'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
