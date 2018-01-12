import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../reducer';
import { hentInnloggingsInfo } from '../ducks/hentInnloggingsInfo';

interface DispatchProps {
    hentInnloggingsInfo: () => void;
}

type HentInitialProps = null & DispatchProps;

export class HentInitialData extends React.Component<HentInitialProps> {
    componentWillMount() {
        this.props.hentInnloggingsInfo();
    }

    render() {
        const { children} = this.props;
        return (children);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentInnloggingsInfo: () => dispatch(hentInnloggingsInfo()),
});

export default connect(null, mapDispatchToProps)(HentInitialData);