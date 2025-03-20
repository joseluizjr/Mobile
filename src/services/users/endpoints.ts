export const endpoints = {
  getUsers: () => `/users`,
  createUser: () => `/users`,
  getUserById: (id: string) => `/users/${id}`,
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,
  updateStatusUser: (id: string, status: string) => `/users/${id}/status/${status}`,
  getTypeUsers: (type: string) => `/users/type/${type}`,
};
