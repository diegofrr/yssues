import { ArrowRightIcon, XIcon } from "@primer/octicons-react";
import { Container, Content } from "./styles";
import { useContext } from "react";
import { FavoritesContext } from "../../../../contexts/StorageRepositories/favorites";
import { Repository } from "~/@types";
import Link from "next/link";

interface Props {
  data: Repository
}

export default function FavoriteRepository({ data }: Props) {
  const { removeFavorite } = useContext(FavoritesContext);

  function formatUrl(url: string): string {
    return url.replace("/", "%2F");
  }

  return (
    <Container>
      <Content>
        <img alt={`${data.name} logo`} src={data.owner.avatar_url} />
        <span>{data.full_name}</span>
        <div>
          <button onClick={() => removeFavorite(data)}>
            <XIcon />
          </button>
          <Link href={`/repository/${formatUrl(data.full_name)}`}>
            Acessar
            <span><ArrowRightIcon size={14} /></span>
          </Link>
        </div>
      </Content>
    </Container>
  );
}
