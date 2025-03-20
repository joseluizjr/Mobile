import { medApi } from '@/libs/axios';

import { endpoints } from './endpoints';
import * as companiesTypes from './types';

class CompaniesFetch {
  async getCompanies(params: companiesTypes.CompanyParams) {
    const res = await medApi.get<companiesTypes.ResponseGetCompanies>(endpoints.getCompanies(), {
      params,
    });
    return res.data;
  }

  async createCompany(body: companiesTypes.BodyCreateCompany) {
    const res = await medApi.post<companiesTypes.Company>(endpoints.createCompany(), body);
    return res.data;
  }

  async updateCompany({ id, body }: companiesTypes.BodyUpdateCompany) {
    const res = await medApi.put<companiesTypes.Company>(endpoints.updateCompany(id), body);
    return res.data;
  }

  async deleteCompany({ id }: companiesTypes.ParamsDeleteCompany) {
    const res = await medApi.delete(endpoints.deleteCompany(id));
    return res.data;
  }

  async getCompanyById({ id }: companiesTypes.ParamsID) {
    const res = await medApi.get<companiesTypes.Company>(endpoints.getCompanyById(id));
    return res.data;
  }

  async updateStatusCompany({ id, status }: companiesTypes.ParamsUpdateStatusCompany) {
    const res = await medApi.patch(endpoints.updateStatusCompany(id, status));
    return res.data;
  }
}

const companiesFetch = new CompaniesFetch();

export default companiesFetch;
