import * as React from "react";
import { reducer, actions } from "../../state_management/reducer";
import { noop } from "../../utils";
import {
  Suggestion,
  Container,
  Label,
  Input,
  Suggestions
} from "./index.styles";

import {
  KEY_CODE_UP,
  KEY_CODE_DOWN,
  KEY_CODE_ENTER,
  KEY_CODE_ESCAPE
} from "../../constants";

export default function Typeahead({ list, onEnter = noop }) {
  const [
    { suggestions, inputValue, suggestionsShown, selectedIndex },
    dispatch
  ] = React.useReducer(reducer, {
    initialList: list,
    suggestions: [],
    inputValue: "",
    suggestionsShown: false,
    selectedIndex: null
  });

  function changeHandler({ target }) {
    dispatch({ type: actions.INPUT_VAL_CHANGE, inputValue: target.value });
  }

  function suggestionSelected(selectionValue) {
    dispatch({ type: actions.SUGGESTION_SELECTED, selectionValue });
  }

  function blurHandler() {
    dispatch({ type: actions.INPUT_BLUR });
  }

  function keyDownHandler({ keyCode }) {
    if (keyCode === KEY_CODE_DOWN) dispatch({ type: actions.KEY_DOWN_PRESS });
    else if (keyCode === KEY_CODE_UP) dispatch({ type: actions.KEY_UP_PRESS });
    else if (keyCode === KEY_CODE_ENTER) {
      dispatch({ type: actions.ENTER_PRESS });
      const val =
        selectedIndex === null ? inputValue : suggestions[selectedIndex];

      onEnter(val);
    } else if (keyCode === KEY_CODE_ESCAPE) {
      dispatch({ type: actions.ESCAPE_PRESS });
    }
  }

  return (
    <Container>
      <Label htmlFor="car">Pick a car:</Label>
      <Input
        id="car"
        value={inputValue}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        onBlur={blurHandler}
      />
      <Suggestions>
        {suggestionsShown &&
          suggestions.map((suggestion, index) => (
            <Suggestion
              onClick={() => suggestionSelected(suggestion)}
              key={suggestion}
              isSelected={index === selectedIndex}
            >
              {suggestion}
            </Suggestion>
          ))}
      </Suggestions>
    </Container>
  );
}
