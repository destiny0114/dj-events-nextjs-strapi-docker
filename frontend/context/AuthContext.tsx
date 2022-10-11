import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { HOME_URL } from "@config";
import { fetchData } from "@utils/helper";
import { UserLogin, UserRegister } from "@tstypes/AccountFields";
import { User, UserResponse } from "@tstypes/User";
import { data } from "autoprefixer";

type UserAuth = {
  status: string;
  user: User | null;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  auth: UserAuth;
  createUser: (user: UserRegister) => void;
  login: (user: UserLogin) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<UserAuth>({ status: "SIGNED_OUT", user: null });

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createUser = useCallback(async ({ username, email, password }: UserRegister) => {
    const data = await fetchData<UserResponse>(`${HOME_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    setAuth({ status: "Registered", user: data.user });
  }, []);

  // Login user
  const login = useCallback(async ({ email: identifier, password }: UserLogin) => {
    const data = await fetchData<UserResponse>(`${HOME_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    setAuth({ status: "SIGNED_IN", user: data.user });
  }, []);

  // Logout user
  const logout = useCallback(async () => {
    await fetchData(`${HOME_URL}/api/logout`, {
      method: "POST",
    });

    setAuth({ status: "SIGNED_OUT", user: null });
  }, []);

  // Check if user is logged in
  const checkUser = useCallback(async () => {
    const data = await fetchData<UserResponse>(`/api/user`);

    if (data.user) return setAuth({ status: "SIGNED_IN", user: data.user });
    setAuth({ status: "INVALID_TOKEN", user: null });
  }, []);

  return <AuthContext.Provider value={{ auth, createUser, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
