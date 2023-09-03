import { ProvideAuth } from "../hooks/useAuth";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <html lang="ja">
    <body>
      <ThemeRegistry>
        <ProvideAuth>{children} </ProvideAuth>
      </ThemeRegistry>
    </body>
  </html>
);

export default RootLayout;
