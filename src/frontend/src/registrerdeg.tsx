import * as React from 'react';
import {FormattedMessage, injectIntl, InjectedIntlProps} from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    tittelId: string;
    beskrivelseId: string;
    knappId: string;
    className?: string;
}

function RegistrerDeg({tittelId, beskrivelseId, knappId, className, intl}: Props & InjectedIntlProps) {
    return (
        <div>
            <h2 className="typo-undertittel"><FormattedMessage id={tittelId}/></h2>
            <div><FormattedMessage id={beskrivelseId}/></div>
            <Knapp type="hoved" className="knapp knapp--hoved">
                <FormattedMessage id={knappId}/>
            </Knapp>
        </div>
    );
}

export default injectIntl(RegistrerDeg);