import { EditorState } from "draft-js";
import * as React from "react";
import { RTEEditor } from "./RTEEditor";

interface AppProps {
}

export default class App extends React.Component<AppProps, {}> {
    constructor(props: AppProps) {
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
