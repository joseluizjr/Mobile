import { medApi } from '@/libs/axios';

import { endpoints } from './endpoints';
import * as heathPlanTypes from './types';

class HeathPlanFetch {
  async getHealthPlan({ healthInsuranceId, params }: heathPlanTypes.HealthPlanParams) {
    const res = await medApi.get<heathPlanTypes.ResponseGetHealthPlan>(endpoints.getHealthPlan(healthInsuranceId), {
      params,
    });
    return res.data;
  }

  async createHealthPlan({ healthInsuranceId, body }: heathPlanTypes.BodyCreateHealthPlan) {
    const res = await medApi.post<heathPlanTypes.HealthPlan>(endpoints.createHealthPlan(healthInsuranceId), body);
    return res.data;
  }

  async getHealthPlanById({ healthInsuranceId, id }: heathPlanTypes.ParamsID) {
    const res = await medApi.get<heathPlanTypes.HealthPlan>(endpoints.getHealthPlanById(healthInsuranceId, id));
    return res.data;
  }

  async deleteHealthPlan({ healthInsuranceId, id }: heathPlanTypes.ParamsID) {
    const res = await medApi.delete(endpoints.deleteHealthPlan(healthInsuranceId, id));
    return res.data;
  }

  async updateHealthPlan({ healthInsuranceId, id, body }: heathPlanTypes.BodyUpdateHealthPlan) {
    const res = await medApi.put(endpoints.updateHealthPlan(healthInsuranceId, id), body);
    return res.data;
  }

  async updateStatusHealthPlan({ healthInsuranceId, id, status }: heathPlanTypes.ParamsUpdateStatusHealthPlan) {
    const res = await medApi.patch(endpoints.updateStatusHealthPlan(healthInsuranceId, id, status));
    return res.data;
  }
}

const heathPlanFetch = new HeathPlanFetch();

export default heathPlanFetch;
