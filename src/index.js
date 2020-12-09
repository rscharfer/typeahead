import React from "react";
import ReactDOM from "react-dom";

import Typeahead from "./components/Typeahead";

const carBrands = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jaguar",
  "Jeep",
  "Kia",
  "Mazda",
  "Mercedez-Benz",
  "Mitsubishi",
  "Nissan",
  "Peugeot",
  "Porsche",
  "SAAB",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

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
