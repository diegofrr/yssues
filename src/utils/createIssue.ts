import { AxiosResponse } from "axios";
import { Issue } from "~/@types";

export default function createIssue(data: any): Issue {
  const repository = {
    id: data.id,
    labels: data.labels,
    user: {
      id: data.user.id,
      login: data.user.login,
      avatar_url: data.user.avatar_url,
    },
    html_url: data.html_url,
    number: data.number,
    state: data.state,
    title: data.title,
    url: data.url
  } as Issue;

  return repository;
}
