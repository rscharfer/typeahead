import styled from "styled-components";

const COLOR_1 = "teal"; // teal
const COLOR_2 = "#dddddd"; // light gray
const COLOR_3 = "#404040"; // dark gray
const COLOR_4 = "#e0f2f1"; // very light teal - almost white

const FONT_SIZE = "18px";
const HEIGHT = "20px";

export const Container = styled.div`
  width: 300px;
`;

export const Label = styled.label`
  font-size: ${FONT_SIZE};
  color: ${COLOR_1};
`;

export const Input = styled.input`
  box-sizing: border-box;
  color: ${COLOR_3};
  width: 100%;
  font-size: ${FONT_SIZE};
  padding: 4px;
  border: 1px solid ${COLOR_2};
  transition: border 0.3s ease-out;

  &:focus {
    border: 1px solid ${COLOR_1};
    outline: none;
  }
`;

export const Suggestions = styled.div`
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
`;

export const Suggestion = styled.div`
  background-color: ${(props) => (props.isSelected ? COLOR_2 : "white")};
  height: ${HEIGHT};
  padding: 4px;
  font-size: ${FONT_SIZE};
  color: ${COLOR_3};

  &:hover {
    background-color: ${COLOR_4};
  }
`;
