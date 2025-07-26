import { AuthStorageKeys } from "@/constants/accesToken";
import { SetCredentialsParams } from "./types";

class Storage {
  public setCredentials({ token, user }: SetCredentialsParams) {
    if (token) {
      localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, token);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  public removeCredentials() {
    localStorage.removeItem(AuthStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem("user");
  }

  public getTokens(): { accessToken: string | null } {
    return {
      accessToken: localStorage.getItem(AuthStorageKeys.ACCESS_TOKEN),
    };
  }

  public getUser(): any | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export const useStorage = new Storage();
