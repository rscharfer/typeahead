import React from "react";
import ReactDOM from "react-dom";

import Typeahead from "./components/Typeahead";

/**
 * EXERCISE
 *
 * Create a Typeahead Input
 * ------------------------
 * Requirements:
 *   1. As the user types in the input, a list of options
 *      should appear below it.
 *   2. The list should contain items from the `list` prop that
 *      *start* with the user entered value.
 *   3. List should only appear when input is not empty.
 *   4. Every new character typed should filter the list.
 *   5. Ignore case when matching.
 *   6. Clicking on a list item should populate the input with
 *      the selected value and hide the list.
 */

/**
 * EXTRA FEATURES 🎉
 *
 *  1. Keyboard navigation (up, down, enter)
 *  2. Clicking anywhere outside input & list closes the list
 *  3. Escape closes the list
 *
 */

/**
 * Please don't change the below code. Use the `list` prop
 * passed to <Typeahead/>.
 */
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
    <Typeahead list={carBrands} />
  </React.StrictMode>,
  rootElement
);
