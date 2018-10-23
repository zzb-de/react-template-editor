import * as React from "react";
import { RTEditor } from "../lib";

interface AppProps {
}

export default class App extends React.Component<AppProps, {}> {

    render() {
        return (
            <div className="rte-app">
                <link rel="stylesheet" type="text/css" href="App.css"/>
                <RTEditor/>
            </div>
        );
    }
}
