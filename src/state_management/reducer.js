export const actions = {
  INPUT_VAL_CHANGE: "INPUT_VAL_CHANGE",
  SUGGESTION_SELECTED: "SUGGESTION_SELECTED",
  KEY_PRESS: "KEY_PRESS",
  KEY_DOWN_PRESS: "KEY_DOWN_PRESS",
  ENTER_PRESS: "ENTER_PRESS",
  INPUT_BLUR: "INPUT_BLUR",
  ESCAPE_PRESS: "ESCAPE_PRESS"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.INPUT_BLUR: {
      return { ...state, suggestionsShown: false };
    }
    case actions.ESCAPE_PRESS: {
      return { ...state, suggestionsShown: false };
    }
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
