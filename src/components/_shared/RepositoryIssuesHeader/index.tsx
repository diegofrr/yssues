import { FiArrowLeft } from "react-icons/fi";

import { HeartFillIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";

import Button from "../Button";
import ToggleThemeButton from "../ToggleThemeButton";
import {
  ActionButtonsContainer,
  AppName,
  Container,
  Content,
  FavoritesTitle,
  PageInfoContainer,
} from "./styles";
import { Repository } from "~/@types";

interface MyProps {
  isEmpty?: boolean,
  isIssues?: boolean,
  isFavorites?: boolean,
  repository?: Repository,
}

export default function RepositoryIssuesHeader(props: MyProps) {
  const { repository, isEmpty, isIssues } = props;
  const router = useRouter();

  function redirect() {
    if (props.isIssues) router.back();
    else router.push("/");
  }

  return (
    <Container>
      <Content>
        {props.isIssues ? (
          <PageInfoContainer>
            <img
              alt={`${repository?.name} logo`}
              src={repository?.owner.avatar_url}
            />
            <div>
              <p>{repository?.name}</p>
              <span>{isIssues ? "issues" : "repo"}</span>
            </div>
          </PageInfoContainer>
        ) : props.isFavorites ? (
          <>
            <FavoritesTitle>
              <HeartFillIcon />
              Favoritos
            </FavoritesTitle>
          </>
        ) : (
          <AppName rel="noreferrer" href="/">
            y<span>ssues</span>
          </AppName>
        )}
        <ActionButtonsContainer>
          <ToggleThemeButton />
          {!isEmpty && (
            <Button onClick={redirect} type="rounded-square">
              <FiArrowLeft />
              Voltar
            </Button>
          )}
        </ActionButtonsContainer>
      </Content>
    </Container>
  );
}
