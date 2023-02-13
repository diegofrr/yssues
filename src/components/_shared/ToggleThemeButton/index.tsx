import { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { ThemeContext } from "../../../contexts/theme";
import { Container } from "./styles";

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Container onClick={toggleTheme}>
      {theme.name === "light" ? <FiSun /> : <FiMoon />}
    </Container>
  );
}
