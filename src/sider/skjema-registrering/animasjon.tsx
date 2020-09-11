import * as React from 'react';
import { disableVerikalScrollingVedAnimasjon } from '../../utils/utils';

interface Props {
    flag: number | string;
}

interface State {
    currentFlag: number | string;
}

class Animasjon extends React.Component<Props, State> {
    // Denne komponenten re-mounter children hver gang flag endrer seg.
    // Det vil trigge at CSS-animasjonen kjører om igjen.

    constructor(props: Props) {
        super(props);
        this.state = {
            currentFlag: this.props.flag
        };
        disableVerikalScrollingVedAnimasjon();
    }

    componentDidUpdate() {
        if (this.props.flag !== this.state.currentFlag) {
            disableVerikalScrollingVedAnimasjon();
            this.setState({currentFlag: this.props.flag});
        }
    }

    render() {
        if (this.props.flag !== this.state.currentFlag) {
            return null;
        }
        return this.props.children;
    }
}

export default Animasjon;
