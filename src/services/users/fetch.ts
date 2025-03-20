import { medApi } from '@/libs/axios';

import { endpoints } from './endpoints';
import * as usersTypes from './types';

class UsersFetch {
  async getUsers(params: usersTypes.UserParams) {
    const res = await medApi.get<usersTypes.ResponseUsers>(endpoints.getUsers(), {
      params,
    });
    return res.data;
  }

  async getTypeUsers(params: usersTypes.TypeUsersParams) {
    const res = await medApi.get<usersTypes.ResponseUsers>(endpoints.getTypeUsers(params.type), {
      params: {
        page: params.page,
        size: params.size,
      },
    });
    return res.data;
  }

  async getUserById({ id }: usersTypes.ParamsID) {
    const res = await medApi.get<usersTypes.User>(endpoints.getUserById(id));
    return res.data;
  }

  async createUser(body: usersTypes.BodyParams) {
    const res = await medApi.post<usersTypes.ResponseUpdateOrCreateUser>(endpoints.createUser(), body);
    return res.data;
  }

  async updateUser({ id, body }: usersTypes.UpdateUserParams) {
    const res = await medApi.put<usersTypes.ResponseUpdateOrCreateUser>(endpoints.updateUser(id), body);
    return res.data;
  }

  async updateStatusUser(params: usersTypes.UpdateStatusParams) {
    const res = await medApi.patch(endpoints.updateStatusUser(params.id, params.status));
    return res.data;
  }

  async deleteUser(id: string) {
    const res = await medApi.delete(endpoints.deleteUser(id));
    return res.data;
  }
}

const usersFetch = new UsersFetch();

export default usersFetch;
