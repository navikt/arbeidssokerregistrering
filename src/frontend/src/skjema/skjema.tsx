import * as React from 'react';
import {Radio} from 'nav-frontend-skjema';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import alleSporsmal from '../sporsmal/alle-sporsmal';
import {Innholdstittel} from 'nav-frontend-typografi';

interface SkjemaProps {
    id: string;
}

interface AlternativProps {
    tekstId: string;
}

function Skjema({id, intl}: SkjemaProps & InjectedIntlProps) {
    const sporsmal = alleSporsmal[parseInt(id)-1];
    return <div>

        <Innholdstittel>{intl.messages[sporsmal.tittel]}</Innholdstittel>
        {sporsmal.alternativer.map(sporsmal => <Alternativ tekstId={sporsmal} intl={intl} />)}
    </div>
}


function Alternativ({tekstId, intl}: AlternativProps & InjectedIntlProps) {
    const tekst = intl.messages[tekstId];

    return <Radio name={tekst} label={tekst} value={tekst}/>
}

export default injectIntl(Skjema);