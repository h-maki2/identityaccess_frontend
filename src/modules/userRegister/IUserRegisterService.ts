import { UserRegisterData } from "./UserRegisterData";

export interface IUserRegisterService
{
    register(userRegisterData: UserRegisterData): void;
}