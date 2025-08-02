import { UserRoleEnum } from "../../enum/userRole.enum";

export interface RegisterRequestDto {
  email: string;
  password: string;
  role: UserRoleEnum;
}
