export const endpoints = {
  getHealthInsurance: () => `/health-insurance`,
  createHealthInsurance: () => `/health-insurance`,
  getHealthInsuranceById: (id: string) => `/health-insurance/${id}`,
  updateHealthInsurance: (id: string) => `/health-insurance/${id}`,
  deleteHealthInsurance: (id: string) => `/health-insurance/${id}`,
  updateStatusHealthInsurance: (id: string, status: string) => `/health-insurance/${id}/status/${status}`,
};
