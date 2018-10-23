import { mount, shallow } from "enzyme";
import * as React from "react";

import { StyleButton } from "./StyleButton";

it("renders a button", () => {
    const styleButton = shallow(
        <StyleButton style="" label="" onToggle={() => {}} />
    );
    expect(styleButton.name()).toEqual("button");
});

it("displays the label given in the label prop", () => {
    const styleButton = shallow(
        <StyleButton style="" label="Test" onToggle={() => {}}/>
    );
    expect(styleButton.text()).toEqual("Test");
});

it("calls onClick when the input changes", () => {
    let called = false;

    function onToggle(s: string) {
        called = true;
    }

    const styleButton = mount(
        <StyleButton style="" label="" onToggle={onToggle}/>
    );
    styleButton.find("button").simulate("mousedown");
    expect(called).toBeTruthy();
});
