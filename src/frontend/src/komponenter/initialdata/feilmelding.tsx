import * as React from 'react';
import InjectedIntl = ReactIntl.InjectedIntl;
import Alertstripe from '../alertstripe';
import { getIntlMessage } from '../../utils/utils';
import { AlertstripeTypes } from 'nav-frontend-alertstriper';

interface FeilmeldingProps {
    intl: InjectedIntl;
    id: string;
    type?: AlertstripeTypes;
}

function Feilmelding({intl, id, type}: FeilmeldingProps) {
    return (<Alertstripe type={type ? type : 'advarsel'} tekst={getIntlMessage(intl.messages, id)}/>);
}

export default Feilmelding;