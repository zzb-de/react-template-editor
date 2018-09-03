import * as React from "react";

const replaceHTMLMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
};

function escape(given: string): string {
    return given.replace(/[<>&]/g, c => replaceHTMLMap[c] || "");
}

export interface EditorProps {
    content?: string;
}

class Editor extends React.Component<EditorProps> {

    render() {
        const { content } = this.props;
        const escapedContent = escape(content || "");
        return (
            <div
                contentEditable
                dangerouslySetInnerHTML={{ __html: escapedContent }}
            />
        );
    }
}

export default Editor;
