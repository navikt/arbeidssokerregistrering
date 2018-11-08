import * as React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

import './info-viser.less';

interface InfoViserProps {
    tekstId: string;
}

class InfoViser extends React.Component<InfoViserProps> {
    render() {
        return (
            <div className="info-viser">
                <span className="info-viser__ikon" aria-label="info">
                    <Ikon kind="info-sirkel" size="1.5em"/>
                </span>
                <Normaltekst>
                    <FormattedMessage id={this.props.tekstId}/>
                </Normaltekst>
            </div>
        );
    }
}

export default InfoViser;