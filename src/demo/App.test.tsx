import * as React from "react";
import * as ReactDOM from "react-dom";

import { shallow } from "enzyme";

import { RTEditor } from "../lib";
import App from "./App";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("contains the editor component", () => {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<RTEditor />)).toBeTruthy();
});
