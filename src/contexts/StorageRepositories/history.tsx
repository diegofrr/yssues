import { createContext, useEffect, useState, ReactNode } from "react";
import { Repository } from "~/@types";


interface ContextProps {
  children: ReactNode
}

interface ProviderProps {
  repositories: Repository[],
  saveRepositories: (r: Repository[]) => void
}

export const RepoHistoryContext = createContext({} as ProviderProps);

export default function RepoHistoryProvider({ children }: ContextProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const repositories = localStorage.getItem("@repoHistory");
    if (repositories) setRepositories(JSON.parse(repositories));
  }, []);

  function saveRepositories(repositories: Repository[]) {
    if (repositories.length > 5) repositories.pop();
    setRepositories(repositories);
    localStorage.setItem("@repoHistory", JSON.stringify(repositories));
  }

  return (
    <RepoHistoryContext.Provider
      value={{
        repositories,
        saveRepositories,
      }}
    >
      {children}
    </RepoHistoryContext.Provider>
  );
}
