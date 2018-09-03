import * as React from "react";
import * as ReactDOM from "react-dom";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("contains the text 'Test'", () => {
    const app = shallow(<App />);
    expect(app.text()).toEqual("Test");
});
