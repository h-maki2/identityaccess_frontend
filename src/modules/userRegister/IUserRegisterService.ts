import { UserRegisterResult } from "./UserRegisterResult";

export interface IUserRegisterService
{
    register(userRegisterData: UserRegisterData): Promise<UserRegisterResult>;
}