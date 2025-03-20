import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const formSchema = zod.object({
  imgPhotoUrl: zod.string().optional(),
  name: zod.string().min(1, 'Nome obrigatório'),
  cpf: zod.string().optional(),
  birthDate: zod.string().min(1, 'Data de nascimento obrigatório'),
  gender: zod.string().optional(),
  email: zod.string().min(1, 'E-mail obrigatório'),
  cns: zod.string().optional(),
  status: zod.string().optional(),
  address: zod.object({
    street: zod.string().min(1, 'Rua obrigatório'),
    city: zod.string().min(1, 'Cidade obrigatório'),
    state: zod.string().min(1, 'Estado obrigatório'),
    postalCode: zod.string().min(1, 'CEP obrigatório'),
    number: zod.string().optional(),
    neighborhood: zod.string().optional(),
    complement: zod.string().optional(),
    reference: zod.string().optional(),
  }),
  contacts: zod
    .object({
      type: zod.string().min(1, 'Tipo de contato obrigatório'),
      description: zod.string().min(1, 'Descrição obrigatória'),
      value: zod.string().min(1, 'Telefone/Celular obrigatório'),
    })
    .array()

    .default([]),
  details: zod.object({
    type: zod.string().optional(),
    allergies: zod.string().optional(),
    preExistingDiseases: zod.string().optional(),
  }),
  keycloakGroup: zod.string().optional(),
});

export const resolverForm = zodResolver(formSchema);

export type CreatePatientFormData = zod.infer<typeof formSchema>;
