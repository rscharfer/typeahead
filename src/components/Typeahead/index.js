import * as React from "react";

const actions = {
  INPUT_VAL_CHANGE: "INPUT_VAL_CHANGE",
  SUGGESTION_SELECTED: "SUGGESTION_SELECTED"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.INPUT_VAL_CHANGE: {
      const regEx = new RegExp(`^${action.inputValue}`, "i");

      return {
        ...state,
        suggestions: action.inputValue
          ? state.initialList.filter((suggestion) => regEx.test(suggestion))
          : [],
        inputValue: action.inputValue,
        suggestionsShown: true
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
    { suggestions, inputValue, suggestionsShown },
    dispatch
  ] = React.useReducer(reducer, {
    initialList: list,
    suggestions: [],
    inputValue: "",
    suggestionsShown: false
  });

  function changeHandler({ target }) {
    dispatch({ type: "INPUT_VAL_CHANGE", inputValue: target.value });
  }

  function suggestionSelected(selectionValue) {
    dispatch({ type: "SUGGESTION_SELECTED", selectionValue });
  }

  return (
    <>
      <label htmlFor="car">Pick a car </label>
      <input id="car" value={inputValue} onChange={changeHandler} />
      {suggestionsShown &&
        suggestions.map((suggestion) => (
          <div onClick={() => suggestionSelected(suggestion)} key={suggestion}>
            {suggestion}
          </div>
        ))}
    </>
  );
}
