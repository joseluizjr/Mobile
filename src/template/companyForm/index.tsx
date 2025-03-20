import { useForm } from 'react-hook-form';
import { MdCleaningServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCreateCompany } from '@/hooks/company/useCreateCompany';
import { useGetCompanies } from '@/hooks/company/useGetCompanies';
import { useUpdateCompany } from '@/hooks/company/useUpdateCompany';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/libs/react-query';
import { ROUTES } from '@/routes/const';
import { companiesKeys } from '@/services/company';
import { Company } from '@/services/company/types';
import { removeEmptyValues } from '@/utils/removeEmptyValues';
import { UFStates } from '@/utils/ufs';

import { CreateCompanyFormData, resolverForm } from './validateForm';

interface CompanyFormProps {
  company?: Company;
  id?: string;
}

export function CompanyForm({ id, company }: CompanyFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { updateCompany, isLoading: isLoadingUpdate } = useUpdateCompany();
  const { createCompany, isLoading: isLoadingCreate } = useCreateCompany();
  const { isLoading: isLoadingCompanies, data: companies } = useGetCompanies({
    page: 0,
    size: 10,
    isSubsidiary: false,
  });

  const isLoading = isLoadingCreate || isLoadingUpdate;

  const form = useForm<CreateCompanyFormData>({
    resolver: resolverForm,
    defaultValues: {
      legalName: company?.legalName ?? '',
      name: company?.name ?? '',
      serviceCapacity: company?.serviceCapacity ? String(company?.serviceCapacity) : '',
      email: company?.email ?? '',
      cnpj: company?.cnpj ?? '',
      cnes: company?.cnes ? String(company?.cnes) : '',
      companyType: company?.companyType ?? '',
      municipalRegistration: company?.municipalRegistration ? String(company?.municipalRegistration) : '',
      phoneNumber: company?.phoneNumber ?? '',
      parentCompanyId: company?.parentCompanyId ?? '',
      isSubsidiary: company?.isSubsidiary ?? false,
      technicalResponsibleId: company?.technicalResponsible?.id ?? '',
      address: {
        street: company?.address.street ?? '',
        number: company?.address.number ?? '',
        neighborhood: company?.address.neighborhood ?? '',
        city: company?.address.city ?? '',
        state: company?.address.state ?? '',
        postalCode: company?.address.postalCode ?? '',
        complement: company?.address.complement ?? '',
        reference: company?.address.reference ?? '',
      },
      accessibilities: {
        hasRamp: company?.accessibilities.hasRamp ?? false,
        hasStaircase: company?.accessibilities.hasStaircase ?? false,
        hasAdaptedBathroom: company?.accessibilities.hasAdaptedBathroom ?? false,
        accessibleParking: company?.accessibilities.accessibleParking ?? false,
        hasSignage: company?.accessibilities.hasSignage ?? false,
        hasElevator: company?.accessibilities.hasElevator ?? false,
        otherResources: company?.accessibilities.otherResources ?? '',
      },
    },
  });

  function onSubmit(data: CreateCompanyFormData) {
    const body = {
      ...data,
      serviceCapacity: data.serviceCapacity.length ? Number(data.serviceCapacity) : 0,
      municipalRegistration: data.municipalRegistration.length ? Number(data.municipalRegistration) : 0,
      cnes: data.cnes.length ? Number(data.cnes) : 0,
    };

    const currentData = removeEmptyValues(body);
    if (id) {
      updateCompany(
        {
          id: id ?? '',
          body: currentData,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Empresa editada com sucesso!',
            });
            queryClient.invalidateQueries({
              queryKey: [companiesKeys.updateCompany],
            });
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Erro ao editar empresa',
            });
          },
        },
      );
    } else {
      createCompany(currentData, {
        onSuccess: () => {
          form.reset();
          toast({
            variant: 'success',
            title: 'Empresa cadastrada com sucesso!',
          });
          queryClient.invalidateQueries({
            queryKey: [companiesKeys.getCompanies],
          });
          navigate(ROUTES.COMPANY.list);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Erro ao cadastrar empresa',
          });
        },
      });
    }
  }

  return (
    <>
      <h2 className="text-2xl text-med-green">{id ? 'Editar Empresa' : 'Cadastrar nova Empresa'}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <ScrollArea className="h-[calc(100vh-15rem)]">
            <p className="text-lg text-gray-500">Dados da Empresa</p>
            <hr className="mt-2 mb-4" />
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-3 my-4">
              <Label className="flex flex-col gap-4">
                Razão social:
                <Input placeholder="Preencha razão social da empresa" {...form.register('legalName')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Nome fantasia:
                <Input placeholder="Preencha razão social da empresa" {...form.register('name')} />
              </Label>
              <Label className="flex flex-col gap-4">
                CNPJ:
                <Input placeholder="Preencha com o CNPJ da empresa" {...form.register('cnpj')} />
              </Label>
            </div>
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
              <Label className="flex flex-col gap-4">
                Email:
                <Input placeholder="Preencha com o email da empresa" {...form.register('email')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Inscrição municipal:
                <Input placeholder="Preencha o e-mail do paciente" {...form.register('municipalRegistration')} />
              </Label>
              <Label className="flex flex-col gap-4">
                CNES:
                <Input placeholder="Preencha o e-mail do paciente" {...form.register('cnes')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Telefone:
                <Input placeholder="Preencha o telefone do paciente" {...form.register('phoneNumber')} />
              </Label>
            </div>
            <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
              <Label className="flex flex-col gap-4">
                Capacidade diária de atendimento:
                <Input placeholder="Preencha o telefone do paciente" {...form.register('serviceCapacity')} />
              </Label>
              <Label className="flex flex-col gap-4">
                Tipo de empresa:
                <Select
                  value={form.watch('companyType')}
                  onValueChange={(value) => form.setValue('companyType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="clinica">Clinica</SelectItem>
                      <SelectItem value="hospital">Hospital</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <Label className="flex flex-col gap-4">
                É subsidiaria:
                <Switch
                  checked={form.watch('isSubsidiary')}
                  onCheckedChange={(value) => form.setValue('isSubsidiary', value)}
                />
              </Label>
              {form.watch('isSubsidiary') && (
                <Label className="flex flex-col gap-4">
                  Matrix
                  <div>
                    <Select
                      value={form.watch('parentCompanyId')}
                      onValueChange={(value) => form.setValue('parentCompanyId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a matrix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {!companies?.content?.length ? (
                            <SelectItem value="#" disabled>
                              Nenhuma empresa encontrada
                            </SelectItem>
                          ) : (
                            companies?.content?.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isLoadingCompanies && <Loading />}
                  </div>
                </Label>
              )}
            </div>
            <div className="mt-4">
              <p className="text-lg text-gray-500">Endereço</p>
              <hr className="mt-2 mb-4" />
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  CEP:
                  <Input placeholder="Preencha com o CEP do endereço" {...form.register('address.postalCode')} />
                </Label>
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
              </div>
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  Cidade:
                  <Input placeholder="Preencha com o nome da cidade" {...form.register('address.city')} />
                </Label>
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
              <p className="text-lg text-gray-500">Acessibilidade</p>
              <hr className="mt-2 mb-4" />
              <div className="w-full flex flex-col gap-4 md:grid md:grid-cols-4 my-4">
                <Label className="flex flex-col gap-4">
                  Estacionamento acessível:
                  <Switch
                    checked={form.watch('accessibilities.accessibleParking')}
                    onCheckedChange={(value) => form.setValue('accessibilities.accessibleParking', value)}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Banheiro adaptável:
                  <Switch
                    checked={form.watch('accessibilities.hasAdaptedBathroom')}
                    onCheckedChange={(value) => form.setValue('accessibilities.hasAdaptedBathroom', value)}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Elevador:
                  <Switch
                    checked={form.watch('accessibilities.hasElevator')}
                    onCheckedChange={(value) => form.setValue('accessibilities.hasElevator', value)}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Rampa de acesso:
                  <Switch
                    checked={form.watch('accessibilities.hasRamp')}
                    onCheckedChange={(value) => form.setValue('accessibilities.hasRamp', value)}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Sinalização visual:
                  <Switch
                    checked={form.watch('accessibilities.hasSignage')}
                    onCheckedChange={(value) => form.setValue('accessibilities.hasSignage', value)}
                  />
                </Label>
                <Label className="flex flex-col gap-4">
                  Possui escada:
                  <Switch
                    checked={form.watch('accessibilities.hasStaircase')}
                    onCheckedChange={(value) => form.setValue('accessibilities.hasStaircase', value)}
                  />
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
                onClick={() => navigate(ROUTES.COMPANY.list)}
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
