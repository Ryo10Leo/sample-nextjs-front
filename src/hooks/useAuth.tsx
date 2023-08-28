import { createContext, useContext, useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { AmplifyConf } from "../app/config/auth";

Amplify.configure({ ...AmplifyConf });

const authContext = createContext({});

export const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
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
