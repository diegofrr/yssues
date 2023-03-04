import { AxiosResponse } from "axios";
import { Repository } from "~/@types";

export default function createRepository({ data }: AxiosResponse): Repository {
  const repository = {
    id: data.id,
    name: data.name,
    owner: {
      id: data.owner.id,
      avatar_url: data.owner.avatar_url,
      login: data.owner.login
    },
    description: data.description,
    forks_count: data.forks_count,
    full_name: data.full_name,
    open_issues_count: data.open_issues_count,
    subscribers_count: data.subscribers_count,
    watchers_count: data.watchers_count,
  } as Repository;

  console.log(data)

  return repository;
}
