import { UserRoleEnum } from "../../enum/userRole.enum";

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
