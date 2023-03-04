import { useContext, useRef, useState } from "react";
import { FiAlertCircle, FiSearch } from "react-icons/fi";
import { ColorRing } from "react-loader-spinner";

import { HistoryIcon } from "@primer/octicons-react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "~/components/_pages/Home/Header";
import HistoryRepository from "~/components/_pages/Home/HistoryRepository";
import Button from "~/components/_shared/Button";
import { SucessToast, ErrorToast } from "~/components/_shared/Toast";
import { RepoHistoryContext } from "../../contexts/StorageRepositories/history";
import { ThemeContext } from "../../contexts/theme";
import {
  Container,
  Content,
  Description,
  HistoryContainer,
  SearchContainer,
} from "./styles";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { theme } = useContext(ThemeContext);
  const { repositories, saveRepositories } = useContext(RepoHistoryContext);
  const [input, setInput] = useState<string>('');

  const [loading, setLoading] = useState(false);

  async function getRepository(repositoryName: string) {
    setLoading(true);
    axios
      .get(`https://api.github.com/repos/${repositoryName}`)
      .then((response) => {
        saveRepositories([response.data, ...repositories]);
        router.push("/repository/" + repositoryName.replace("/", "%2F"));
      })
      .catch((e) => {
        console.log(e);
        ErrorToast({
          message: "Repositório não encontrado :(",
          icon: <FiAlertCircle size={18} />,
        });
      })
      .finally(() => setLoading(false));
  }

  async function searchRepository() {
    if (input === " " || !input.includes("/") || input.split("/").length > 2) {
      ErrorToast({
        message: "Digite um nome de repositório válido!",
        icon: <FiAlertCircle size={18} />,
      });
    } else {
      await getRepository(input);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.code === "Enter") searchRepository();
  }

  function handleClearHistory() {
    SucessToast({
      message: "Histórico apagado!",
    });
  }

  return (
    <>
      <Head>
        <title>Página inicial</title>
      </Head>
      <>
        <Header />
        <Container>
          <Content emptyHistory={repositories.length === 0}>
            <Description>
              Encontre repositórios <br /> e acompanhe suas <span>issues</span>.
            </Description>
            <SearchContainer>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                ref={inputRef}
                onKeyPress={(e) => handleKeyPress(e)}
                placeholder="Pesquisar repositório (user/repository)"
              />
              <button onClick={searchRepository}>
                {loading ? (
                  <ColorRing
                    wrapperStyle={{ width: '24', height: '24' }}
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperClass="blocks-wrapper"
                    colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
                  />
                ) : (
                  <FiSearch color="#FFF" size={20} />
                )}
              </button>
            </SearchContainer>
            {repositories.length > 0 && (
              <HistoryContainer>
                <div className="header">
                  <p>
                    <HistoryIcon size={16} />
                    Histórico
                  </p>
                  <button onClick={() => saveRepositories([])}>Limpar</button>
                </div>
                <div className="content">
                  {repositories.map((r, i) => (
                    <HistoryRepository key={i} data={r} />
                  ))}
                </div>
              </HistoryContainer>
            )}
          </Content>
        </Container>
      </>
    </>
  );
}
