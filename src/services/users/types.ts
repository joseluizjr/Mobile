export type UserParams = {
  page: number;
  size: number;
};

export type TypeUsersParams = UserParams & {
  type: 'EMPLOYEE' | 'PROFESSIONAL' | 'PATIENT';
};

export type PatientDetails = {
  type: 'EMPLOYEE' | 'PROFESSIONAL' | 'PATIENT';
  nroHealthCard: string;
  allergies: string;
  preExistingDiseases: string;
  responsibleId: string;
  professionalResponsibleId: string;
  healthPlanId: string;
};

export type User = {
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
  contacts: {
    id: string;
    ownerId: string;
    whoseIs: 'USER' | 'COMPANY';
    type: 'EMAIL' | 'PHONE' | 'CELL_PHONE';
    description: string;
    value: string;
    createdAt: string;
    updatedAt: string;
  }[];
  details: PatientDetails;
  keycloakId: string;
  createdAt: string;
  updatedAt: string;
};

export type ResponseUsers = {
  totalElements: number;
  totalPages: number;
  content: User[];
  first: boolean;
  last: boolean;
};

export type ParamsID = {
  id: string;
};

export type BodyParams = {
  name: string;
  birthDate: string;
  gender: string;
  cpf: string;
  cns: string;
  email: string;
  imgPhotoUrl: string;
  status: string;
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
  contacts: {
    type: 'EMAIL' | 'PHONE' | 'CELL_PHONE';
    description: string;
    value: string;
  }[];
  details: PatientDetails;
  keycloakGroup: 'ALL' | 'COMPANY_TEST' | 'HEALTH_INSURANCE' | 'USER';
};

export type UpdateUserParams = {
  id: string;
  body: BodyParams;
};

export type ResponseUpdateOrCreateUser = {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  cpf: string;
  cns: string;
  email: string;
  imgPhotoUrl: string;
  status: string;
  details: {
    type: string;
    department: string;
    position: string;
    admissionDate: string;
    terminationDate: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateStatusParams = {
  id: string;
  status: string;
};
