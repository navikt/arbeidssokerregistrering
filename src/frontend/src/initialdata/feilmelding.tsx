import * as React from 'react';
import InjectedIntl = ReactIntl.InjectedIntl;
import Alertstripe from '../komponenter/alertstripe';
import { getIntlMessage } from '../utils/utils';

interface FeilmeldingProps {
    intl: InjectedIntl;
    id: string;
}

function Feilmelding({ intl, id }: FeilmeldingProps) {
    return (<Alertstripe type="advarsel" tekst={getIntlMessage(intl.messages, id)}/>);
}

export default Feilmelding;