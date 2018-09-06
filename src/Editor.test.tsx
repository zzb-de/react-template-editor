import * as React from "react";

import { render, shallow } from "enzyme";

import Editor from "./Editor";

it("is a div and has attribute contenteditable", () => {
    const editor = shallow(<Editor />);
    expect(editor.name()).toEqual("div");
    expect(editor.props()).toHaveProperty("contentEditable", true);
});

it("is empty if the content property is not supplied", () => {
    const editor = render(<Editor />);
    expect(editor.text()).toEqual("");
});

it("contains the text supplied in the content property", () => {
    const editor = render(<Editor content="Test"/>);
    expect(editor.text()).toEqual("Test");
});

it("escapes valid html", () => {
    const content = "<p></p>&lt;";
    const editor = render(<Editor content={content}/>);
    expect(editor.text()).toEqual("<p></p>&lt;");
});

it("works when onChange is not given", () => {
    const editor = shallow(<Editor/>);
    editor.find("div").simulate("input");
});

it("calls onChange when the input changes", () => {
    let called = false;

    function onChange(text: string) {
        called = true;
        expect(text).toEqual("Test");
    }
    const editor = shallow(<Editor onChange={onChange}/>);
    editor.find("div").simulate("input", { target: { innerText: "Test" } });
    expect(called).toBeTruthy();
});