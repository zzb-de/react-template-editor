import * as React from "react";
import "./App.css";
import Editor from "./Editor";

interface AppState {
    content: string;
}

class App extends React.Component<{}, AppState> {

    state: AppState = {
        content: ""
    };

    constructor(props: {}) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { content } = this.state;
        return (
            <div className="rte-app">
                <Editor content={content} onChange={this.onChange}/>
            </div>
        );
    }

    private onChange(text: string): void {
        this.setState({ content: text });
    }
}

export default App;
