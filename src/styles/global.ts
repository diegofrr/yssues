import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: 0;
  font-family: "Plus Jakarta Sans", sans-serif;
}

body {
  font-weight: 400;
  font-size: 16px;
}

a {
  cursor: pointer;
  text-decoration: none;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  transition: all 0.3s ease;
}

@media (max-width: 720px) {
  html {
    font-size: 95%;
  }
}

@media (max-width: 540px) {
  html {
    font-size: 90%;
  }
}
`

export default GlobalStyle;
