import { ProvideAuth } from "../hooks/useAuth";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>
          <ProvideAuth>{children} </ProvideAuth>
        </ThemeRegistry>
      </body>
    </html>
  );
}
