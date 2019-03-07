import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Feilmelding from './feilmelding';
import { Normaltekst } from 'nav-frontend-typografi';
import utropstegnSvg from '../../sider/fullfor/utropstegn.svg';
import './feilmelding-mangler-arbeidstillatelse.less';

const FeilmeldingManglerArbeidstillatelseFss: React.SFC = () => {
    return (
        <Feilmelding bilde={utropstegnSvg} className="feilmelding-mangler-arbeidstillatelse">
            <Normaltekst className="feilmelding__innhold--center">
                <FormattedMessage id="feilmelding-mangler-arbeidstillatelse-innhold-fss"/>
            </Normaltekst>
        </Feilmelding>
    );
};

export default FeilmeldingManglerArbeidstillatelseFss;
