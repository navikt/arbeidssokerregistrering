import * as React from 'react';
import ProgressBar from './progress-bar';
import { progressBarConfig } from './progress-bar-utils';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import Animasjon from '../../sider/skjema/animasjon';

interface OwnProps {
    config?: string[];
}

type Props = OwnProps & RouteComponentProps<MatchProps>;

class ProgressBarContainer extends React.Component<Props> {
    render() {
        // Tar med :url fra Router for å oppdatere progressbar når url endres
        const config = progressBarConfig;
        const pathname = document.location.pathname;
        if (progressBarConfig.includes(pathname)) {
            return (
                <Animasjon flag={document.location.href}>
                    <ProgressBar
                        gjeldendeSporsmal={progressBarConfig.indexOf(pathname) + 1}
                        antallSporsmal={config.length}
                    />
                </Animasjon>
            );
        } else {
            return (null);
        }
    }
}

export default ProgressBarContainer;
