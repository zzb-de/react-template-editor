import { ContentState } from "draft-js";
import { mount, shallow } from "enzyme";
import * as React from "react";

import Editor from "./RTEEditor";

it("renders a div with a certain class", () => {
    const editor = shallow(<Editor />);
    expect(editor.name()).toEqual("div");
    expect(editor.hasClass("rte-editor")).toBeTruthy();
});

it("contains an editor div with a certain class", () => {
    const editor = shallow(<Editor />);
    expect(editor.find(".rte-editor-container")).toHaveLength(1);
});

// This test can't work,
// since keyDown events will not change the element state in JSDom.
xit("displays the input text", () => {
    let onContentChangeCalled = false;
    function onContentChange(state: ContentState) {
        onContentChangeCalled = true;
    }

    const editor = mount(<Editor onContentChange={onContentChange}/>);
    editor.find(
        ".public-DraftEditor-content").simulate("keyDown", {
        keyCode: 40,
        metaKey: false,
        ctrlKey: true,
        altKey: false,
    });
    editor.find("[data-text=\"true\"]").text();
    expect(onContentChangeCalled).toBeTruthy();
});
