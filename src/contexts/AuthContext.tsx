import { authService } from "@/services/auth/auth";
import { SignUpRequest } from "@/services/auth/types";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpRequest) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export const signOut = async () => {
  destroyCookie(undefined, "@nextauth.token");
  Router.push("/");
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {
    setLoading(true);
    const res = await authService.signIn({ email, password });

    if (res) {
      const { token, id, name, email } = res;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser({ id, name, email });

      Router.push("/dashboard");
    }
    setLoading(false);
  };

  const signUp = async ({ email, name, password }: SignUpRequest) => {
    setLoading(true);
    const res = await authService.signUp({ email, name, password });

    if (res) {
      Router.push("/");
    }

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
