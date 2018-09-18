import * as React from "react";

interface StyleButtonProps {
    style: string;
    label: string;
    toggled?: boolean;
    onToggle: (style: string) => void;
}

export class StyleButton extends React.Component<StyleButtonProps, any> {

    constructor(props: Readonly<StyleButtonProps>) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        const backgroundColor = this.props.toggled ? "#e0e0e0" : "#f0f0f0";
        return (
            <button
                style={{ backgroundColor }}
                onClick={this.onClick}
            >
              {this.props.label}
            </button>
        );
    }

    private onClick(e: React.MouseEvent) {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }
}
