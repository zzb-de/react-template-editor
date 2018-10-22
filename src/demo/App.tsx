import * as React from "react";
import { RTEditor } from "../lib/index";
import "./App.css";

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
                <RTEditor content={content} onChange={this.onChange}/>
            </div>
        );
    }

    private onChange(text: string): void {
        this.setState({ content: text });
    }
}

export default App;
