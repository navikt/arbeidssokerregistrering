import * as React from 'react';
import {
    DUERNAREGISTRERT_PATH,
    FULLFOR_PATH,
    OPPSUMMERING_PATH,
    SKJEMA_PATH,
    START_PATH
} from '../../utils/konstanter';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MatchProps } from '../../utils/utils';

const paths = [
    START_PATH,
    SKJEMA_PATH,
    OPPSUMMERING_PATH,
    FULLFOR_PATH,
    DUERNAREGISTRERT_PATH
];

interface State {
    forover: boolean;
}

type Props = RouteComponentProps<MatchProps>;

class Sideanimasjon extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            forover: true
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.location !== this.props.location) {
            this.setState({
                ...this.state,
                forover: this.skalAnimereForover(nextProps),
            });
        }
    }

    skalAnimereForover(nextProps: Props): boolean {
        const currentPath = this.trimPath(this.props.location.pathname);
        const nextPath = this.trimPath(nextProps.location.pathname);

        if (currentPath === SKJEMA_PATH && nextPath === SKJEMA_PATH) {
            return this.nesteSporsmalIdErStorreEnnNavaerende(nextProps);
        } else {
            return paths.indexOf(currentPath) < paths.indexOf(nextPath);
        }
    }

    nesteSporsmalIdErStorreEnnNavaerende(nextProps: Props): boolean {
        return this.getIdFromPath(this.props.location.pathname) < this.getIdFromPath(nextProps.location.pathname);
    }

    trimPath(path: string): string {
        if (path.startsWith(SKJEMA_PATH)) {
            return SKJEMA_PATH;
        } else {
            return path;
        }
    }

    getIdFromPath(path: string): number {
        return Number(path.split('/')[2]);
    }

    render() {
        return (
            <div className={!this.state.forover ? 'limit bakover' : 'limit forover'}>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Sideanimasjon);
