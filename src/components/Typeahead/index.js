import * as React from "react";
import { Suggestion } from "./index.styles";

const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;

const actions = {
  INPUT_VAL_CHANGE: "INPUT_VAL_CHANGE",
  SUGGESTION_SELECTED: "SUGGESTION_SELECTED",
  KEY_PRESS: "KEY_PRESS",
  KEY_DOWN_PRESS: "KEY_DOWN_PRESS"
};

const reducer = (state, action) => {
  switch (action.type) {
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

      return {
        ...state,
        suggestions: action.inputValue
          ? state.initialList.filter((suggestion) => regEx.test(suggestion))
          : [],
        inputValue: action.inputValue,
        suggestionsShown: true,
        selectedIndex: action.inputValue === "" ? null : state.selectedIndex
      };
    }
    case actions.SUGGESTION_SELECTED: {
      return {
        ...state,
        suggestionsShown: false,
        inputValue: action.selectionValue
      };
    }
    default:
      return state;
  }
};

export default function Typeahead({ list }) {
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
  }

  return (
    <>
      <label htmlFor="car">Pick a car </label>
      <input
        id="car"
        value={inputValue}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
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
    </>
  );
}
