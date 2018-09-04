import * as React from "react";
import * as ReactDOM from "react-dom";

import { shallow } from "enzyme";

import App from "./App";
import { OnChange } from "./Editor";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("contains the editor component", () => {
    const app = shallow(<App />);
    expect(app.children().length).toEqual(1);
    expect(app.childAt(0).name()).toEqual("Editor");
});

it("should save the content given by onChange", () => {
    const app = shallow(<App />);
    const editor = app.find("Editor");
    const onChange = editor.prop<OnChange>("onChange");
    onChange("Test");
    expect(app.find("Editor").prop("content")).toEqual("Test");
});
