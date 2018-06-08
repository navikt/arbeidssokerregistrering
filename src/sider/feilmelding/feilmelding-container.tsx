import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import FeilmeldingGenerell from './feilmelding-generell';

function FeilmeldingContainer(props: InjectedIntlProps) {
    return (
        <ResponsivSide>
            <FeilmeldingGenerell intl={props.intl}/>
        </ResponsivSide>
    );
}

export default injectIntl(FeilmeldingContainer);