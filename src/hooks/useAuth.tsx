"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyConf } from "../app/config/auth";
import { useRouter } from "next/navigation";

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

export const useProvideAuth = (): AuthContextType => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const signIn = async (username: string, password: string) => {
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

  const signOut = async () => {
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

  const toLoginPage = () => {
    setUserName("");
    setIsAuthenticated(false);
    router.push("/login");
    return;
  };

  useEffect(() => {
    const checkCurrentAuth = async () => {
      try {
        setIsLoading(false);
        const result = await Auth.currentAuthenticatedUser();
        setUserName(result.username);
        setIsAuthenticated(true);
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
