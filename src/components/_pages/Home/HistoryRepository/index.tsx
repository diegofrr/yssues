/* eslint-disable @next/next/no-img-element */
import { Repository } from "~/@types";
import { Container, Content } from "./styles";

interface Props {
  data: Repository
}

export default function HistoryRepository({ data }: Props) {

  function formatUrl(url: string): string {
    return url.replace("/", "%2F");
  }

  return (
    <Container href={`/repository/${formatUrl(data.full_name)}`}>
      <Content>
        <img alt={`${data.name} logo`} src={data.owner.avatar_url} />
        <span>{data.full_name}</span>
      </Content>
    </Container>
  );
}
