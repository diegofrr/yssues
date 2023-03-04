/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import RepositoryIssuesHeader from "~/components/_shared/RepositoryIssuesHeader";

import { FavoritesContext } from "../../contexts/StorageRepositories/favorites";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ActionButtons, Container, Content, LikeButton } from "./styles";
import {
  EyeIcon,
  HeartFillIcon,
  HeartIcon,
  RepoForkedIcon,
  StarFillIcon,
  StarIcon,
} from "@primer/octicons-react";
import Button from "~/components/_shared/Button";
import createRepository from "~/utils/createRepository";
import { ThemeContext } from "../../contexts/theme";
import { ColorRing } from "react-loader-spinner";
import { Repository as RepositoryType } from "~/@types";

export default function Repository() {
  const router = useRouter();
  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);
  const { theme } = useContext(ThemeContext);
  const { repositoryName } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [repository, setRepository] = useState<RepositoryType>({} as RepositoryType);
  const spinColor = theme.colors.blue[200];

  useEffect(() => {
    if (repositoryName) {
      (async () => {
        setLoading(true);
        axios
          .get(`https://api.github.com/repos/${repositoryName}`)
          .then((response) => {
            setRepository(createRepository(response));
            setLoading(false);
          }).catch((err) => {
            console.log(err)
          });
      })();
    }
  }, [repositoryName]);

  function formatValue(n: number): string {
    if (n < 1e3) return String(n);
    else return String((n / 1e3).toFixed(0) + "K");
  }

  function goToIssues(): void {
    router.push("/issues/" + repository?.full_name.replace("/", "%2F"));
  }

  return (
    <>
      <Head>
        <title>
          {repository?.name ? "Repo • " + repository.name : "Loading..."}
        </title>
      </Head>
      {repository?.name && <RepositoryIssuesHeader repository={repository} />}
      <Container>
        <Content>
          {loading ? (
            <ColorRing
              visible={true}
              height="60"
              width="60"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={[spinColor, spinColor, spinColor, spinColor, spinColor]}
            />
          ) : (
            <>
              <img alt="Avatar of repository owner" className="logo" src={repository.owner?.avatar_url} />
              <div>
                <p className="name">{repository.name}</p>
                <span className="description">{repository.description}</span>
                <div className="stats">
                  <span>
                    <StarIcon />
                    {formatValue(repository.watchers_count)}
                  </span>
                  <span>
                    <RepoForkedIcon />
                    {formatValue(repository.forks_count)}
                  </span>
                  <span>
                    <EyeIcon />
                    {formatValue(repository.subscribers_count)}
                  </span>
                </div>
                <ActionButtons>
                  <Button onClick={goToIssues} type="rounded" primary>
                    Ver issues
                  </Button>
                  <LikeButton onClick={() => toggleFavorite(repository)}>
                    {isFavorite(repository) ? (
                      <HeartFillIcon fill={theme.colors.red} />
                    ) : (
                      <HeartIcon fill={theme.colors.secundary} />
                    )}
                  </LikeButton>
                </ActionButtons>
              </div>
            </>
          )}
        </Content>
      </Container>
    </>
  );
}
