import { AuthSession } from "@/lib/auth-storage";
import { LoginResponse } from "@/types/User";

export const mapLoginResponseToSession = (
  response: LoginResponse,
): AuthSession => {
  return {
    accessToken: response.access_token,
    user: {
      id: response.user.id,
      email: response.user.email,
      username: response.user.username ?? null,
      firstName: response.user.firstName ?? null,
      lastName: response.user.lastName ?? null,
      phone: response.user.phone ?? null,
      role: response.user.role,
    },
  };
};
