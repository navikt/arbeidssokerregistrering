import * as React from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Normaltekst } from 'nav-frontend-typografi';
import { withTranslation, WithTranslation } from 'react-i18next'
import classNames from 'classnames';

import './info-viser.less';

interface InfoViserProps {
    tekstId: string;
    className?: string;
}

class InfoViser extends React.Component<InfoViserProps & WithTranslation>  {
    render() {
        const { t } = this.props;

        return (
            <div className={classNames('info-viser', this.props.className)}>
                <span className="info-viser--ikon" aria-label="info">
                    <Ikon kind="info-sirkel-fyll" size="1.5em" />
                </span>
                <Normaltekst className="info-viser--kursiv">
                    {t(this.props.tekstId)}
                </Normaltekst>
            </div>
        );
    }
}

export default withTranslation()(InfoViser);