import { EditorState } from "draft-js";
import * as React from "react";
import { RTEEditor } from "./RTEEditor";

interface MyEditorProps {
}

export class App extends React.Component<MyEditorProps, any> {
    constructor(props: MyEditorProps) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    }

    handleChange(e: EditorState) {
        this.setState({ editorState: e });
    }

    render() {
        return (
            <RTEEditor />
        );
    }
}
