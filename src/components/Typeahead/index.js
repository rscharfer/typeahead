import * as React from "react";
import {
  Suggestion,
  Container,
  Label,
  Input,
  Suggestions
} from "./index.styles";

const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;
const KEY_CODE_ENTER = 13;

const actions = {
  INPUT_VAL_CHANGE: "INPUT_VAL_CHANGE",
  SUGGESTION_SELECTED: "SUGGESTION_SELECTED",
  KEY_PRESS: "KEY_PRESS",
  KEY_DOWN_PRESS: "KEY_DOWN_PRESS",
  ENTER_PRESS: "ENTER_PRESS"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ENTER_PRESS: {
      return {
        ...state,
        inputValue:
          state.selectedIndex === null
            ? state.inputValue
            : state.suggestions[state.selectedIndex],

        suggestionsShown: false
      };
    }
    case actions.KEY_DOWN_PRESS: {
      const {
        selectedIndex,
        suggestions: { length: sl }
      } = state;
      let newIndex = selectedIndex === null ? 0 : (selectedIndex + 1) % sl;
      return { ...state, selectedIndex: newIndex };
    }
    case actions.KEY_UP_PRESS: {
      const {
        selectedIndex,
        suggestions: { length: sl }
      } = state;
      let newIndex =
        selectedIndex === null ? sl - 1 : (selectedIndex - 1 + sl) % sl;
      return { ...state, selectedIndex: newIndex };
    }

    case actions.INPUT_VAL_CHANGE: {
      const regEx = new RegExp(`^${action.inputValue}`, "i");
      const newSuggestions = action.inputValue
        ? state.initialList.filter((item) => regEx.test(item))
        : [];

      return {
        ...state,
        suggestions: newSuggestions,
        inputValue: action.inputValue,
        suggestionsShown: newSuggestions.length > 0,
        selectedIndex: null
      };
    }
    case actions.SUGGESTION_SELECTED: {
      return {
        ...state,
        suggestionsShown: false,
        inputValue: action.selectionValue,
        selectedIndex: null
      };
    }
    default:
      return state;
  }
};

function noop() {}

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
    dispatch({ type: "INPUT_VAL_CHANGE", inputValue: target.value });
  }

  function suggestionSelected(selectionValue) {
    dispatch({ type: "SUGGESTION_SELECTED", selectionValue });
  }

  function keyDownHandler({ keyCode }) {
    if (keyCode === KEY_CODE_DOWN) dispatch({ type: actions.KEY_DOWN_PRESS });
    else if (keyCode === KEY_CODE_UP) dispatch({ type: actions.KEY_UP_PRESS });
    else if (keyCode === KEY_CODE_ENTER) {
      dispatch({ type: actions.ENTER_PRESS });
      const val =
        selectedIndex === null ? inputValue : suggestions[selectedIndex];

      onEnter(val);
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
