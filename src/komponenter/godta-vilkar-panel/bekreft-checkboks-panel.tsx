// TODO Slett denne når komponenten legges til i nav-frontend-moduler
// https://github.com/navikt/nav-frontend-moduler/pull/246
import * as React from 'react';
import * as classNames from 'classnames';
import { guid } from '../../utils/utils';

interface Props {
    onChange: (event: React.SyntheticEvent<EventTarget>) => void;
    checked: boolean;
    label: string;
    children?: React.ReactNode | React.ReactChildren;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
}

interface State {
    hasFocus: boolean;
    isHover: boolean;
}

export class BekreftCheckboksPanel extends React.Component<Props, State> {
    private childrenId: string;

    constructor(props: Props) {
        super(props);
        this.state = {hasFocus: false, isHover: false};
        if (this.props.children) {
            this.childrenId = guid();
        }
    }

    toggleOutline() {
        this.setState({
            ...this.state,
            hasFocus: !this.state.hasFocus,
        });
    }

    toggleHover(isHover: boolean) {
        this.setState({
            ...this.state,
            isHover
        });
    }

    onKeyDown(event: React.KeyboardEvent<EventTarget>) {
        if (event.key === 'Enter') {
            this.props.onChange(event);
        }
    }

    renderChildren() {
        const children = this.props.children;
        return children ? <div id={this.childrenId}>{children}</div> : null;
    }

    render() {
        const {checked, onChange, label, inputProps, className} = this.props;
        const {hasFocus, isHover} = this.state;

        const cls = classNames('inputPanelLocal bekreftCheckboksPanelLocal', className, {
            'inputPanelLocal--checked': checked,
            'inputPanelLocal--focused': hasFocus,
            'inputPanelLocal--hover': isHover,
        });

        return (
            <div className={cls}>
                {this.renderChildren()}
                <label
                    className="inputPanelLocal__label"
                    onMouseEnter={() => this.toggleHover(true)}
                    onMouseLeave={() => this.toggleHover(false)}
                    onKeyDown={(event) => this.onKeyDown(event)}
                >
                    <input
                        {...inputProps}
                        className="inputPanelLocal__field"
                        type="checkbox"
                        checked={checked}
                        onFocus={() => this.toggleOutline()}
                        onBlur={() => this.toggleOutline()}
                        onChange={onChange}
                        aria-labelledby={this.childrenId}
                    />
                    <span className="inputPanelLocal__label">{label}</span>
                </label>
            </div>
        );
    }
}

export default BekreftCheckboksPanel;