export type HealthPlan = {
  id: string;
  name: string;
  type: string;
  category: string;
  geographicalCoverage: string;
  ansRecord: string;
  endEffectiveDate: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type HealthInsuranceIdParams = {
  healthInsuranceId: string;
};

export type HealthPlanParams = HealthInsuranceIdParams & {
  params: {
    page: number;
    size: number;
  };
};

export type ResponseGetHealthPlan = {
  totalElements: number;
  totalPages: number;
  content: HealthPlan[];
  first: boolean;
  last: boolean;
};

export type ResponseGetHealthPlanById = HealthPlan;

export type BodyHealthPlan = {
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

export type BodyCreateHealthPlan = HealthInsuranceIdParams & {
  body: BodyHealthPlan;
};

export type BodyUpdateHealthPlan = HealthInsuranceIdParams & {
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

export type ParamsID = HealthInsuranceIdParams & {
  id: string;
};

export type ParamsUpdateStatusHealthPlan = ParamsID & {
  status: string;
};
