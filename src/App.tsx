import * as React from "react";
import { RTEEditor } from "./RTEEditor";

interface AppProps {
}

export default class App extends React.Component<AppProps, {}> {
    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <div className="rte-app">
                <link rel="stylesheet" type="text/css" href="App.css"/>
                <RTEEditor/>
            </div>
        );
    }
}
