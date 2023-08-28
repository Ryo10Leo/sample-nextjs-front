import { createContext, useContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyConf } from "../app/config/auth";

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  username: string;
  signIn: (
    username: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  signOut: () => Promise<{ success: boolean; message: string }>;
};

Amplify.configure({ ...AmplifyConf });

const createCtx = () => {
  const ctx = createContext<AuthContextType | undefined>(undefined);
  function useAuthContext() {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useAuthContext, ctx.Provider] as const;
};

const [useAuthContext, SetAuthProvider] = createCtx();

export const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <SetAuthProvider value={auth}>{children}</SetAuthProvider>;
};

export const useAuth = () => {
  return useAuthContext();
};

const useProvideAuth = (): AuthContextType => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        setUsername(result.username);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setUsername("");
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const result = await Auth.signIn(username, password);
      setUsername(result.username);
      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "ログインに失敗しました。",
      };
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUsername("");
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "ログアウトに失敗しました。",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    signIn,
    signOut,
  };
};
