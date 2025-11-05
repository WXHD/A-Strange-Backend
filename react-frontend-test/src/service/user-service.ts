import type { UserItem } from "@type/user";
import { BaseRequest } from "./service";

export type UserResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  users: UserItem[];
};

class UserService extends BaseRequest {
  constructor() {
    super({
      baseURL: "/strange_api",
      loginExpiredCode: [],
      successCode: ["success"],
      onLoginExpired: () => { },
      onRequestError: (error) => {
        void window.globalMessage.error(error.message);
      },
    });
  }

  /** 用户接口 */

  public getUserList = (params: {
    limit: number;
    offset: number;
  }) => {
    return this.$post<UserResponse>("/user", {}, { params });
  };

  public getUserById = (params: { user_id: number }) => {
    return this.$get<UserItem>(`/user/${params.user_id}`);
  };

  public addUser = (params: {
    username: string;
    pwd: string;
  }) => {
    return this.$post<void>(`/add_user`, params);
  };

  public deleteUser = (params: Pick<UserItem, "id">) => {
    return this.$delete<void>(`/delete_user/${params.id}`);
  };

  public updateUser = (params: {
    id: number;
    username: string;
    pwd: string;
  }) => {
    return this.$post<void>(`/update_user/${params.id}`, params);
  };

  public authenticate = (params: {
    username: string;
    pwd: string;
  }) => {
    return this.$post<UserItem>("/authenticate", params);
  };
}

export const userService = new UserService();
