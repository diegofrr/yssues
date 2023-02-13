import { useCallback, useEffect, useRef, useState } from "react";
import { Container, Options, Option, Select, Background } from "./styles";
import { TriangleDownIcon as DownIcon } from "@primer/octicons-react";

interface DropdownProps {
  state: string,
  setState: (s: string) => void
}

export default function IssueTypeDropdown(props: DropdownProps) {
  const select = useRef<HTMLButtonElement>(null);
  const [margin, setMargin] = useState<number>(0);
  const [openDropdrown, setOpenDropdown] = useState<boolean>(false);

  const state = (state: string) => {
    return state === "open"
      ? "Abertas"
      : state === "closed"
        ? "Fechadas"
        : "Todas";
  };

  const options = ["all", "open", "closed"];

  useEffect(() => {
    setMargin(select.current?.clientWidth || 0);
  }, [state]);

  function handleChangeState(state: string) {
    props.setState(state);
    toggleDropdown();
  }

  function toggleDropdown() {
    setOpenDropdown(!openDropdrown);
  }

  return (
    <>
      <Container>
        <Select ref={select} onClick={toggleDropdown}>
          {state(props.state)} <DownIcon />
        </Select>
        {openDropdrown && (
          <Options margin={margin}>
            {options.map((op, i) => (
              <Option
                selected={op === props.state}
                onClick={() => handleChangeState(op)}
                key={i}
              >
                {state(op)}
              </Option>
            ))}
          </Options>
        )}
      </Container>
      {openDropdrown && <Background onClick={toggleDropdown} />}
    </>
  );
}
