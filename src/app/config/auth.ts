const AmplifyConf = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION ?? "",
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID ?? "",
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID ?? "",
    oauth: {
      redirectSignIn: "http://localhost:3000",
    },
  },
};

export default AmplifyConf;
