"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = { children: ReactNode };

export const NextAuthProvider = ({ children }: Props): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};
