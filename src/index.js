import React from "react";
import ReactDOM from "react-dom";

import Typeahead from "./components/Typeahead";
import { carBrands } from "./constants";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Typeahead
      list={carBrands}
      onEnter={(val) => console.log(`${val} was entered!!`)}
    />
  </React.StrictMode>,
  rootElement
);
