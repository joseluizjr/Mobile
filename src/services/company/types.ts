export type Company = {
  id: string;
  name: string;
  legalName: string;
  logoUrl: string;
  address: {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement: string;
    reference: string;
    whoseIs: string;
  };
  parentCompanyId?: string;
  serviceCapacity: 0;
  email: string;
  cnpj: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  isSubsidiary: true;
  companyType: string;
  status: string;
  municipalRegistration: 0;
  cnes: string;
  technicalResponsible: {
    id: string;
    name: string;
    birthDate: string;
    gender: string;
    cpf: string;
    cns: string;
    email: string;
    imgPhotoUrl: string;
    status: string;
    address: {
      id: string;
      street: string;
      number: string;
      city: string;
      state: string;
      neighborhood: string;
      postalCode: string;
      complement: string;
      reference: string;
      createdAt: string;
      updatedAt: string;
    };
    contacts: [
      {
        id: string;
        ownerId: string;
        whoseIs: string;
        type: string;
        description: string;
        value: string;
        createdAt: string;
        updatedAt: string;
      },
    ];
    details: string;
    keycloakGroupId: string;
    keycloakUserId: string;
    createdAt: string;
    updatedAt: string;
  };
  accessibilities: {
    hasRamp: true;
    hasStaircase: true;
    hasAdaptedBathroom: true;
    accessibleParking: true;
    hasSignage: true;
    hasElevator: true;
    otherResources: string;
  };
};

export type CompanyParams = {
  page: number;
  size: number;
  isSubsidiary?: boolean;
};

export type ResponseGetCompanies = {
  totalElements: number;
  totalPages: number;
  content: Company[];
  first: boolean;
  last: boolean;
};

export type ResponseGetCompanyById = Company;

export type BodyCompany = {
  name: string;
  serviceCapacity: number;
  email: string;
  cnpj: string;
  cnes: number;
  companyType: string;
  municipalRegistration: number;
  phoneNumber: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement: string;
    reference: string;
  };
  parentCompanyId?: string;
  isSubsidiary: boolean;
  technicalResponsibleId?: string;
  accessibilities: {
    hasRamp: boolean;
    hasStaircase: boolean;
    hasAdaptedBathroom: boolean;
    accessibleParking: boolean;
    hasSignage: boolean;
    hasElevator: boolean;
    otherResources: string;
  };
};

export type BodyCreateCompany = BodyCompany;

export type BodyUpdateCompany = {
  id: string;
  body: BodyCompany;
};

export type ParamsID = {
  id: string;
};

export type ParamsUpdateStatusCompany = ParamsID & {
  status: string;
};

export type ParamsDeleteCompany = ParamsID;
