export const endpoints = {
  getCompanies: () => `/companies`,
  createCompany: () => `/companies`,
  getCompanyById: (id: string) => `/companies/${id}`,
  updateCompany: (id: string) => `/companies/${id}`,
  deleteCompany: (id: string) => `/companies/${id}`,
  updateStatusCompany: (id: string, status: string) => `/companies/${id}/status/${status}`,
};
