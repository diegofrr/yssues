/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Head from "next/head";
import Issue from "~/components/_pages/Issues/Issue";
import Button from "../../components/_shared/Button";
import IssueTypeDropdown from "~/components/_pages/Issues/Dropdown";
import RepositoryIssuesHeader from "~/components/_shared/RepositoryIssuesHeader";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/router";
import {
  ActionsContainer,
  Container,
  Content,
  Empty,
  IssuesContainer,
  PaginationButtons,
} from "./styles";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../contexts/theme";
import { Issue as IssueType, Repository } from "~/@types";
import createRepository from "~/utils/createRepository";
import createIssue from "~/utils/createIssue";

export default function RepositoryNameIssues() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { repositoryName } = useRouter().query;
  const spinColor = theme.colors.blue[200];

  const [page, setPage] = useState<number>(1);
  const [state, setState] = useState<string>("all");
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [requested, setRequested] = useState<boolean>();
  const [repository, setRepository] = useState<Repository>();
  const [maxPages, setMaxPages] = useState<number>(0);

  useEffect(() => {
    if (repositoryName) {
      (async () => {
        setLoading(true);
        const [repositoryData, issuesData] = await Promise.all([
          axios.get(`https://api.github.com/repos/${repositoryName}`),
          axios.get(`https://api.github.com/repos/${repositoryName}/issues`, {
            params: {
              state,
              per_page: 15,
              page,
            },
          }),
        ]);

        const repository = createRepository(repositoryData);
        const issues = [] as IssueType[];

        issuesData.data.forEach((i: any) => {
          issues.push(createIssue(i))
        })


        setRepository(repository);
        setIssues(issues);
        setLoading(false);
        setRequested(true);
      })();
    }
  }, [repositoryName, page, state]);

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    const calc = (value: number): number => {
      let pages = Number((value / 15).toFixed(0));
      let rest = value % 15;
      return rest > 0 ? pages + 1 : pages;
    };

    if (repository?.name) {
      const all = issues[0]?.number;
      const opened = repository.open_issues_count;
      const closed = all - opened;
      setMaxPages(
        calc(state === "open" ? opened : state === "closed" ? closed : all)
      );
    }
  }, [repository, state, issues]);

  function handleChangeIssuesPage(_page: number): void {
    setPage(page + _page);
  }

  return (
    <>
      <Head>
        <title>
          {repository?.name ? "Issues • " + repository.name : "Loading..."}
        </title>
      </Head>
      {repository?.name && (
        <RepositoryIssuesHeader
          isEmpty={issues.length === 0}
          isIssues
          repository={repository}
        />
      )}
      <Container>
        <Content>
          {!requested || issues.length > 0 ? (
            <>
              <ActionsContainer>
                <IssueTypeDropdown state={state} setState={setState} />
                <PaginationButtons>
                  {page > 1 && (
                    <button onClick={() => handleChangeIssuesPage(-1)}>
                      <FiArrowLeft /> Anterior
                    </button>
                  )}
                  {page < maxPages - 1 && (
                    <button onClick={() => handleChangeIssuesPage(1)}>
                      Próxima
                      <FiArrowRight />
                    </button>
                  )}
                </PaginationButtons>
              </ActionsContainer>
              <IssuesContainer>
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
                  issues.map((issue) => <Issue key={issue.id} data={issue} />)
                )}
              </IssuesContainer>
            </>
          ) : (
            <Empty>
              <img alt="Empty issues icon" src="/images/empty-issues.svg" />
              <span>
                Não há issues por <br /> aqui ainda.
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
