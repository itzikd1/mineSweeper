import React from "react";
import ReactDOM from "react-dom";
import NavBarComponent from '../Components/NavBarComponent';

import {render,cleanup} from "@testing-library/react"
import "@testing-library/jest-dom"

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<NavBarComponent/>,div)
});


it('render the right navBar', () => {
  const {getByTestId} = render (<NavBarComponent/>);
  expect(getByTestId("navbar")).toHaveTextContent("Home");
});