import { medApi } from '@/libs/axios';

import { endpoints } from './endpoints';
import * as heathInsuranceTypes from './types';

class HeathInsuranceFetch {
  async getHealthInsurance(params: heathInsuranceTypes.HealthInsuranceParams) {
    const res = await medApi.get<heathInsuranceTypes.ResponseGetHealthInsurance>(endpoints.getHealthInsurance(), {
      params,
    });
    return res.data;
  }

  async createHealthInsurance(body: heathInsuranceTypes.BodyCreateHealthInsurance) {
    const res = await medApi.post<heathInsuranceTypes.HealthInsurance>(endpoints.createHealthInsurance(), body);
    return res.data;
  }

  async getHealthInsuranceById({ id }: heathInsuranceTypes.ParamsID) {
    const res = await medApi.get<heathInsuranceTypes.HealthInsurance>(endpoints.getHealthInsuranceById(id));
    return res.data;
  }

  async deleteHealthInsurance({ id }: heathInsuranceTypes.ParamsID) {
    const res = await medApi.delete(endpoints.deleteHealthInsurance(id));
    return res.data;
  }

  async updateHealthInsurance({ id, body }: heathInsuranceTypes.BodyUpdateHealthInsurance) {
    const res = await medApi.put(endpoints.updateHealthInsurance(id), body);
    return res.data;
  }

  async updateStatusHealthInsurance({ id, status }: heathInsuranceTypes.ParamsUpdateStatusHealthInsurance) {
    const res = await medApi.patch(endpoints.updateStatusHealthInsurance(id, status));
    return res.data;
  }
}

const heathInsuranceFetch = new HeathInsuranceFetch();

export default heathInsuranceFetch;
