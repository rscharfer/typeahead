import * as React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_VAL_CHANGE": {
      return {
        suggestions: state.suggestions.filter((suggestion) =>
          suggestion.startsWith(action.value)
        ),
        inputValue: action.value
      };
    }
    default:
      return state;
  }
};

export default function Typeahead({ list }) {
  const [{ suggestions, inputValue }, dispatch] = React.useReducer(reducer, {
    suggestions: list,
    inputValue: ""
  });

  function changeHandler({ target }) {
    dispatch({ type: "INPUT_VAL_CHANGE", value: target.value });
  }

  return (
    <>
      <label htmlFor="car">Pick a car </label>
      <input id="car" value={inputValue} onChange={changeHandler} />
      {suggestions.map((suggestion) => (
        <div>{suggestion}</div>
      ))}
    </>
  );
}
