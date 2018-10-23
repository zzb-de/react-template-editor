import { ContentState } from "draft-js";
import * as React from "react";
import { createEmptyState, stateToMarkdown, RTEditor, markdownToState } from "../lib";

interface AppProps {
}

interface AppState {
    readonly contentState?: ContentState;
    readonly initialContent?: ContentState;
}

export default class App extends React.Component<AppProps, AppState> {

    state: AppState = {contentState: createEmptyState()};

    constructor(props: AppProps) {
        super(props);
        this.onContentChange = this.onContentChange.bind(this);
        this.exportToLocalStorage = this.exportToLocalStorage.bind(this);
        this.importFromLocalStorage = this.importFromLocalStorage.bind(this);
    }

    render() {
        return (
            <div className="rte-app">
                <link rel="stylesheet" type="text/css" href="App.css"/>
                <RTEditor
                    initialContent={this.state.initialContent}
                    onContentChange={this.onContentChange}
                />
                <button onClick={this.exportToLocalStorage}>
                    Exportieren
                </button>
                <button onClick={this.importFromLocalStorage}>
                    Importieren
                </button>
            </div>
        );
    }

    private onContentChange(rtState: ContentState) {
        this.setState( {contentState: rtState} );
    }

    private exportToLocalStorage() {
        if (this.state.contentState) {
            localStorage.setItem(
                "markdownContent", stateToMarkdown(this.state.contentState
                ));
        }
    }

    private importFromLocalStorage() {
        const markdownContent = localStorage.getItem("markdownContent");
        if (markdownContent !== null) {
            const mds = markdownToState(markdownContent);
            this.setState({
                initialContent: mds,
                contentState: mds
            });
        }
    }
}
