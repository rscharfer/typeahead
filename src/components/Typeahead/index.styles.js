import styled from "styled-components";

export const Suggestion = styled.div`
  background-color: ${({ isSelected }) => (isSelected ? "gray" : "white")};
`;
