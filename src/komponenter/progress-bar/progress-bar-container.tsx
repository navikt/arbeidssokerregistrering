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

        const pathName = document.location.pathname.replace(basename, '');
        const config = finnRiktigConfig(pathName);

        if (config.length === 0) {
            return null;
        } else {
            return (
                <ProgressBar
                    gjeldendeSporsmal={config.indexOf(pathName)}
                    antallSporsmal={config.length}
                    offset={3}
                />
            );

        }

    }
}

export default ProgressBarContainer;
