export interface fff {
  theme: string,
  toggleTheme: () => void
}

export interface Theme {
  name: string,
  colors: {
    primary: string,

    secundary: string

    bg: string,

    blue: {
      100: string,
      200: string,
      300: string,
    },
    red: string,

    button: {
      bg: string,
      text: string,
      hoverBg: string,
    },

    input: {
      bg: string,
      placeholder: string,
      text: string,
    },

    issue: {
      user: string,
      title: string,
    },

    dropdown: {
      bg: string,
      text: string,
      divider: string,
      shadow: string,
    },

    header: {
      title: string,
      border: string,
    },

    imgBackground: string,
  }

}

type User = {
  id: number,
  login: string,
  avatar_url: string,
}

export interface Repository {
  id: number,
  name: string,
  owner: User,
  description: string | null,
  full_name: string,
  watchers_count: number,
  forks_count: number,
  subscribers_count: number,
  open_issues_count: number,
}

type label = {
  name: string
}

export interface Issue {
  id: number,
  number: number,
  user: User,
  url: string,
  title: string,
  state: string,
  html_url: string,
  labels: label[]
}
