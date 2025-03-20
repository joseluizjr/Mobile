export type HealthInsurance = {
  id: string;
  name: string;
  logoUrl: string;
  cnpj: string;
  ans: string;
  type: string;
  status: string;
  expireAt: string;
  createdAt: string;
  updatedAt: string;
};

export type HealthInsuranceParams = {
  page: number;
  size: number;
};

export type ResponseGetHealthInsurance = {
  totalElements: number;
  totalPages: number;
  content: HealthInsurance[];
  first: boolean;
  last: boolean;
};

export type ResponseGetHealthInsuranceById = HealthInsurance;

export type BodyHealthInsurance = {
  name: string;
  logoUrl: string;
  cnpj: string;
  ans: string;
  type: string;
  status: string;
  expireAt: string;
  plans: {
    name: string;
    type: string;
    category: string;
    geographicalCoverage: string;
    ansRecord: string;
    endEffectiveDate: string;
    status: string;
    description: string;
  }[];
};

export type BodyCreateHealthInsurance = BodyHealthInsurance;

export type BodyUpdateHealthInsurance = {
  id: string;
  body: {
    name: string;
    logoUrl: string;
    cnpj: string;
    ans: string;
    type: string;
    status: string;
    expireAt: string;
  };
};

export type ParamsID = {
  id: string;
};

export type ParamsUpdateStatusHealthInsurance = ParamsID & {
  status: string;
};
