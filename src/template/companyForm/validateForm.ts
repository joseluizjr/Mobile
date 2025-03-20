import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const formSchema = zod.object({
  name: zod.string(),
  legalName: zod.string(),
  serviceCapacity: zod.string(),
  email: zod.string(),
  cnpj: zod.string(),
  cnes: zod.string(),
  companyType: zod.string(),
  municipalRegistration: zod.string(),
  phoneNumber: zod.string(),
  isSubsidiary: zod.boolean(),
  parentCompanyId: zod.string().optional(),
  technicalResponsibleId: zod.string().optional(),
  address: zod.object({
    street: zod.string(),
    number: zod.string(),
    neighborhood: zod.string(),
    city: zod.string(),
    state: zod.string(),
    postalCode: zod.string(),
    complement: zod.string(),
    reference: zod.string(),
  }),
  accessibilities: zod.object({
    hasRamp: zod.boolean(),
    hasStaircase: zod.boolean(),
    hasAdaptedBathroom: zod.boolean(),
    accessibleParking: zod.boolean(),
    hasSignage: zod.boolean(),
    hasElevator: zod.boolean(),
    otherResources: zod.string(),
  }),
});

export const resolverForm = zodResolver(formSchema);

export type CreateCompanyFormData = zod.infer<typeof formSchema>;
