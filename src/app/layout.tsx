"use client";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { AmplifyConf } from "./config/auth";
import { Amplify } from "aws-amplify";

Amplify.configure({ ...AmplifyConf });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
