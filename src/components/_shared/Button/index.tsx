import { ReactNode } from "react";
import { Container } from "./styles";

interface ButtonProps {
  type: string,
  primary?: boolean,
  onClick: () => void,
  children: ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <Container
      onClick={props.onClick}
      _type={props.type}
      primary={props.primary}
    >
      {props.children}
    </Container>
  );
}
