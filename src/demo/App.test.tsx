import * as React from "react";
import * as ReactDOM from "react-dom";

import { shallow } from "enzyme";

import Editor, { OnChange } from "../lib/Editor";
import App from "./App";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("contains the editor component", () => {
    const app = shallow(<App />);
    expect(app.containsMatchingElement(<Editor content=""/>)).toBeTruthy();
});

it("saves the content given by onChange", () => {
    const app = shallow(<App />);
    const editor = app.find("Editor");
    const onChange = editor.prop<OnChange>("onChange");
    onChange("Test");
    expect(app.find("Editor").prop("content")).toEqual("Test");
});
