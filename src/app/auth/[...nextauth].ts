import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export const Auth = () => {
  if (
    process.env.COGNITO_CLIENT_ID === undefined ||
    process.env.COGNITO_CLIENT_SECRET === undefined
  ) {
    throw Error("COGNITO_CLIENT_ID & COGNITO_CLIENT_SECRET not defined in env file");
  }
  return NextAuth({
    providers: [
      CognitoProvider({
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        issuer: process.env.COGNITO_ISSUER,
      }),
    ],
  });
};
