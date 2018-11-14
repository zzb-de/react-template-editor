import {
    Editor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    getDefaultKeyBinding,
} from "draft-js";
import * as React from "react";
import { StyleButton } from "./StyleButton";
import { RTState } from "./types";

export interface RTEEditorProps {
    readonly initialContent?: RTState;
    readonly onContentChange?: (content: RTState) => void;
}

interface RTEEditorState {
    readonly editorState: EditorState;
}

export default class RTEEditor
    extends React.Component<RTEEditorProps, RTEEditorState> {
    state: RTEEditorState = {
        editorState: EditorState.createEmpty(),
    };

    constructor(props: Readonly<RTEEditorProps>) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    }

    render() {
        const {editorState} = this.state;
        let className = "rte-editor-container";
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== "unstyled") {
                className += " rte-editor-no-text";
            }
        }

        const inlineStyle = editorState.getCurrentInlineStyle();
        return (
            <div className="rte-editor">
                <StyleButton
                    style="ITALIC"
                    label="Italics"
                    toggled={inlineStyle.has("ITALIC")}
                    onToggle={this.toggleInlineStyle}
                />
                <StyleButton
                    style="BOLD"
                    label="Bold"
                    toggled={inlineStyle.has("BOLD")}
                    onToggle={this.toggleInlineStyle}
                />
                <StyleButton
                    style="UNDERLINE"
                    label="Underline"
                    toggled={inlineStyle.has("UNDERLINE")}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder="Bitte Text eingeben."

                        spellCheck
                    />
                </div>
            </div>
        );
    }

    componentDidUpdate(oldProps: RTEEditorProps) {
        if (oldProps.initialContent !== this.props.initialContent) {
            this.setState({editorState: EditorState.push(
                this.state.editorState, this.props.initialContent!,
                "change-block-data"
            )});
        }
    }

    private onChange(editorState: EditorState) {
        this.setState({editorState});
        if (this.props.onContentChange) {
            this.props.onContentChange(
                this.state.editorState.getCurrentContent());
        }
    }

    private handleKeyCommand(command: any):
        DraftHandleValue {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState, command);
        if (newState) {
            this.setState({editorState: newState});
            return "handled";
        }
        return "not-handled";
    }

    private mapKeyToEditorCommand(e: React.KeyboardEvent) {
        if (e.keyCode === 9 ) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4,
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return null;
        }
        return getDefaultKeyBinding(e);
    }

    private toggleInlineStyle(inlineStyle: string) {
        const editorState =
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);
        this.setState({
            editorState,
        });
    }

}
