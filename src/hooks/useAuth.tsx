"use client";

import { Provider, createContext, useContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import AmplifyConf from "../app/config/auth";

type AuthContextType = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userName: string;
  signIn: (
    userName: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  signOut: () => Promise<{ success: boolean; message: string }>;
  toLoginPage: () => void;
};

Amplify.configure({ ...AmplifyConf });

const createCtx = (): readonly [() => AuthContextType, Provider<AuthContextType | undefined>] => {
  const ctx = createContext<AuthContextType | undefined>(undefined);
  function useAuthContext(): AuthContextType {
    const c = useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useAuthContext, ctx.Provider] as const;
};

const [useAuthContext, SetAuthProvider] = createCtx();

export const useProvideAuth = (): AuthContextType => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const signIn = async (
    username: string,
    password: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const result = await Auth.signIn(username, password);
      setUserName(result.username);
      setIsAuthenticated(true);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "ログインに失敗しました。",
      };
    }
  };

  const signOut = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      await Auth.signOut();
      setUserName("");
      setIsAuthenticated(false);
      return { success: true, message: "" };
    } catch (error) {
      return {
        success: false,
        message: "ログアウトに失敗しました。",
      };
    }
  };

  const toLoginPage = (): void => {
    setUserName("");
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    const checkCurrentAuth = async (): Promise<void> => {
      try {
        setIsLoading(false);
        const result = await Auth.currentAuthenticatedUser();
        setUserName(result.username);
        setIsAuthenticated(true);

        if (!result.username) {
          setUserName("");
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      } catch (error) {
        setUserName("");
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    checkCurrentAuth();
  }, []);

  return {
    isLoading,
    isAuthenticated,
    userName,
    signIn,
    signOut,
    toLoginPage,
  };
};

export const ProvideAuth = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const auth = useProvideAuth();
  return <SetAuthProvider value={auth}>{children}</SetAuthProvider>;
};

export const useAuth = (): AuthContextType => useAuthContext();
