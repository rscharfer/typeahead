import * as React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_VAL_CHANGE": {
      const regEx = new RegExp(`^${action.value}`, "i");
      return {
        ...state,
        suggestions: action.value
          ? state.initialList.filter((suggestion) => regEx.test(suggestion))
          : [],
        inputValue: action.value
      };
    }
    default:
      return state;
  }
};

export default function Typeahead({ list }) {
  const [{ suggestions, inputValue }, dispatch] = React.useReducer(reducer, {
    initialList: list,
    suggestions: [],
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
        <div key={suggestion}>{suggestion}</div>
      ))}
    </>
  );
}
