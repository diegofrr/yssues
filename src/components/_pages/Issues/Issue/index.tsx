import { useRouter } from "next/router";
import { Container, Content, Label } from "./styles";
import {
  IssueOpenedIcon as Opened,
  IssueClosedIcon as Closed,
} from "@primer/octicons-react";
import { Issue as IssueType } from "~/@types";

interface IssueProps {
  data: IssueType
}

export default function Issue({ data }: IssueProps) {
  const router = useRouter();
  const state = data.state;

  return (
    <Container title="Abrir issue" href={data.html_url} target="_blank">
      <Content state={data.state}>
        <img className="profile_img" src={data.user.avatar_url} />
        <div>
          <span className="user_name">{data.user.login}</span>
          <p className="issue_title">
            {data.title} <br />
            {data.labels.map((label, i) => (
              <span key={i}>
                <Label>{label.name}</Label>
              </span>
            ))}
          </p>
          <span className="issue_id">#{data.id}</span>
        </div>
        <span className="issue_state">
          {state === "open" ? <Opened /> : <Closed />}
        </span>
      </Content>
    </Container>
  );
}
