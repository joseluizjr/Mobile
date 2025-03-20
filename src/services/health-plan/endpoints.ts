export const endpoints = {
  getHealthPlan: (healthInsuranceId: string) => `/health-insurance/${healthInsuranceId}/health-plan/filter`,
  createHealthPlan: (healthInsuranceId: string) => `/health-insurance/${healthInsuranceId}/health-plan`,
  getHealthPlanById: (healthInsuranceId: string, id: string) =>
    `/health-insurance/${healthInsuranceId}/health-plan/${id}`,
  updateHealthPlan: (healthInsuranceId: string, id: string) =>
    `/health-insurance/${healthInsuranceId}/health-plan/${id}`,
  deleteHealthPlan: (healthInsuranceId: string, id: string) =>
    `/health-insurance/${healthInsuranceId}/health-plan/${id}`,
  updateStatusHealthPlan: (healthInsuranceId: string, id: string, status: string) =>
    `/health-insurance/${healthInsuranceId}/health-plan/${id}/status/${status}`,
};
