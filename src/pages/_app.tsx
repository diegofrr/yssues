import "../styles/fonts";

import CustomThemeProvider from "../contexts/theme";
import RepoHistoryProvider from "../contexts/StorageRepositories/history";
import FavoritesProvider from "../contexts/StorageRepositories/favorites";
import GlobalStyle from "~/styles/global";

import { Toaster } from "react-hot-toast";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomThemeProvider>
      <RepoHistoryProvider>
        <GlobalStyle />
        <FavoritesProvider>
          <Toaster position="bottom-center" />
          <Component {...pageProps} />
        </FavoritesProvider>
      </RepoHistoryProvider>
    </CustomThemeProvider>
  );
}
