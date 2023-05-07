import { authService } from "@/services/auth";
import { SignUpRequest } from "@/services/auth/types";
import { http } from "@/services/httpClient";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

      Router.push("/");
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

  useEffect(() => {
    (async () => {
      const { "@nextauth.token": token } = parseCookies();

      if (token) {
        const res = await authService.getUser();
        if (res) {
          const { email, id, name } = res;
          http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setUser({
            name,
            email,
            id,
          });
        }
      }
    })();
  }, [isAuthenticated]);

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
