import * as React from "react";

const replaceHTMLMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
};

function escape(given: string): string {
    return given.replace(/[<>&]/g, c => replaceHTMLMap[c] || "");
}

export type OnChange = (text: string) => void;

export interface EditorProps {
    content?: string;
    onChange?: OnChange;
}

class Editor extends React.Component<EditorProps> {
    constructor(props: EditorProps) {
        super(props);
        this.onInput = this.onInput.bind(this);
    }

    render() {
        const { content } = this.props;
        const escapedContent = escape(content || "");
        return (
            <div
                className="rte-editor"
                contentEditable
                dangerouslySetInnerHTML={{ __html: escapedContent }}
                onInput={this.onInput}
            />
        );
    }

    private onInput(evt: React.SyntheticEvent): void {
        if (this.props.onChange) {
            const target = evt.target as HTMLDivElement;
            this.props.onChange(target.innerText);
        }
    }
}

export default Editor;
