import * as React from "react";
import "./App.css";
import Editor from "./Editor";

class App extends React.Component {
    render() {
        return (
            <div><Editor content=""/></div>
        );
    }
}

export default App;
