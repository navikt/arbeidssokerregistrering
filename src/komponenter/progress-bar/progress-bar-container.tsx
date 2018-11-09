import * as React from 'react';
import ProgressBar from './progress-bar';
import { finnRiktigConfig } from './progress-bar-utils';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { basename } from '../../utils/konstanter';

interface OwnProps {
    config?: string[];
}

type Props = OwnProps & RouteComponentProps<MatchProps>;

class ProgressBarContainer extends React.Component<Props> {

    render() {
        // Tar med :url fra Router for å oppdatere progressbar når url endres
        const pathname = this.props.location.pathname.toString().replace(basename, '');
        const config = finnRiktigConfig(pathname);

        console.log("finriktigconfig", pathname, config); // tslint:disable-line

        if (config.length === 0) {
            return null;
        } else {
            return (
                <ProgressBar
                    gjeldendeSporsmal={config.indexOf(pathname)}
                    antallSporsmal={config.length}
                    offset={3}
                />
            );

        }

    }
}

export default ProgressBarContainer;
