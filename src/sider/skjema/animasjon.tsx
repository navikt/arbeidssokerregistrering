import * as React from 'react';

interface Props {
    flag: number;
}

interface State {
    visible: boolean;
}

class Animasjon extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.flag !== this.props.flag) {
            this.setState({visible: false});
        }
    }

    render() {
        if (!this.state.visible) {
            this.setState({visible: true});
        }
        return this.state.visible ? this.props.children : null;
    }
}

export default Animasjon;