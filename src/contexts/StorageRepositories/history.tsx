import { createContext, useEffect, useState, ReactNode } from "react";
import { Repository } from "~/@types";

export const RepoHistoryContext = createContext({});

interface ContextProps {
  children: ReactNode
}

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
