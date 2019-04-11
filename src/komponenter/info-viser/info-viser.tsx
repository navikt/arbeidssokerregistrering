import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import './info-viser.less';

interface InfoViserProps {
    tekstId: string;
    className?: string;
}

class InfoViser extends React.Component<InfoViserProps> {
    render() {
        return (
            <div className={classNames('info-viser', this.props.className)}>
                <span className="info-viser--ikon" aria-label="info">
                    test
                </span>
                <Normaltekst className="info-viser--kursiv">
                    <FormattedMessage id={this.props.tekstId}/>
                </Normaltekst>
            </div>
        );
    }
}

export default InfoViser;