/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Button from "../../components/_shared/Button";
import Router, { useRouter } from "next/router";
import FavoriteRepository from "~/components/_pages/Favorites/Favorite";
import RepositoryIssuesHeader from "~/components/_shared/RepositoryIssuesHeader";

import { useContext, useState } from "react";
import { FavoritesContext } from "../../contexts/StorageRepositories/favorites";
import { Container, Content, Empty, FavoritesContainer } from "./styles";
import { FiArrowLeft } from "react-icons/fi";

export default function Favorites() {
  const router = useRouter();
  const { repositories } = useContext(FavoritesContext);

  return (
    <>
      <Head>
        <title>Favoritos</title>
      </Head>
      <RepositoryIssuesHeader isFavorites />
      <Container>
        <Content>
          {repositories.length > 0 ? (
            <>
              <h1>{repositories.length} repositórios salvos.</h1>
              <FavoritesContainer>
                {repositories.map((r, i) => (
                  <FavoriteRepository key={i} data={r} />
                ))}
              </FavoritesContainer>
            </>
          ) : (
            <Empty>
              <img alt="Empty issues icon" src="/images/empty-favorites.svg" />
              <span>
                Você não possui <br /> repositórios salvos.
              </span>
              <Button onClick={() => router.back()} type="rounded-square">
                <FiArrowLeft />
                Voltar
              </Button>
            </Empty>
          )}
        </Content>
      </Container>
    </>
  );
}
