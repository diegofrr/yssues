import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { HeartFillIcon, XIcon } from "@primer/octicons-react";
import { SucessToast, ErrorToast } from "~/components/_shared/Toast";
import { Repository } from "~/@types";


interface ChildrenProps {
  children: ReactNode
}

interface ContextProps {
  repositories: Repository[],
  isFavorite: (r: Repository) => boolean,
  removeFavorite: (r: Repository) => void,
  toggleFavorite: (r: Repository) => void
}

export const FavoritesContext = createContext({} as ContextProps);

export default function FavoritesProvider({ children }: ChildrenProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const repositories = localStorage.getItem("@favorites");
    if (repositories) setRepositories(JSON.parse(repositories));
  }, []);

  function isFavorite(repository: Repository): boolean {
    return repositories.some((r) => r.id === repository.id);
  }

  function removeFavorite(repository: Repository): void {
    const _favorites = repositories.filter((r) => r.id !== repository.id);
    setRepositories(_favorites);
    localStorage.setItem("@favorites", JSON.stringify(_favorites));
    ErrorToast({
      message: "Removido dos favoritos.",
      icon: <XIcon />,
      duration: 1000,
    });
  }

  function addFavorite(repository: Repository): void {
    const _favorites = [repository, ...repositories];
    setRepositories(_favorites);
    localStorage.setItem("@favorites", JSON.stringify(_favorites));
    SucessToast({
      message: "Adicionado aos favoritos.",
      icon: <HeartFillIcon />,
      duration: 1000,
    });
  }

  function toggleFavorite(repository: Repository): void {
    if (isFavorite(repository)) removeFavorite(repository);
    else addFavorite(repository);
  }

  return (
    <FavoritesContext.Provider
      value={{
        repositories,
        isFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
