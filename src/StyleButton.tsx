import * as React from "react";

interface StyleButtonProps {
    readonly style: string;
    readonly label: string;
    readonly toggled?: boolean;
    readonly onToggle?: (style: string) => void;
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
                onMouseDown={this.onClick}
            >
              {this.props.label}
            </button>
        );
    }

    private onClick(e: React.MouseEvent) {
        e.preventDefault();
        if (this.props.onToggle) this.props.onToggle(this.props.style);
    }
}
