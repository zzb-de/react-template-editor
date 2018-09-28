import {
    Editor,
    EditorState,
    RichUtils,
    DraftHandleValue,
    getDefaultKeyBinding, ContentState,
} from "draft-js";
import * as React from "react";
import { StyleButton } from "./StyleButton";

export interface RTEEditorProps {
    readonly onContentChange?: (content: ContentState) => void;
}

interface RTEEditorState {
    readonly editorState: EditorState;
}

export class RTEEditor
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

    private onChange(editorState: EditorState) {
        if (this.props.onContentChange) {
            this.props.onContentChange(
                this.state.editorState.getCurrentContent());
        }
        this.setState({editorState});
    }

    private handleKeyCommand(command: any, editorState: EditorState):
        DraftHandleValue
    {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState, command);
        if (newState) {
            this.setState({ editorState: newState });
            return "handled";
        }
        return "not-handled";
    }

    private mapKeyToEditorCommand(e: React.KeyboardEvent) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
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
