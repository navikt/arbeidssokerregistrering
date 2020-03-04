import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import LenkeMedChevron from '../../komponenter/lenke-med-chevron/lenke-med-chevron';
import Feilmelding from './feilmelding';
import utropstegnSvg from '../../sider/fullfor/utropstegn.svg';
import { erIFSS } from '../../utils/fss-utils';
import { lagAktivitetsplanUrl } from '../../utils/url-utils';
import './feilmelding-mangler-arbeidstillatelse.less';
import { getTekst } from '../../utils/utils';

const FeilmeldingManglerArbeidstillatelse: React.SFC = (props: any) => {

    let innholdId = 'feilmelding-mangler-arbeidstillatelse-innhold';
    let lenkeTekstId = 'feilmelding-mangler-arbeidstillatelse-lenke-tekst';
    let lenkeUrl = getTekst('finn-ditt-nav-kontor-lenke-url', 'nb');

    if (erIFSS()) {
        innholdId += '-fss';
        lenkeTekstId += '-fss';
        lenkeUrl = lagAktivitetsplanUrl();
    }

    return (
        <Feilmelding bilde={utropstegnSvg} className="feilmelding-mangler-arbeidstillatelse">
            <Normaltekst className="blokk-s">
                { getTekst(innholdId, 'nb') }
            </Normaltekst>
            <LenkeMedChevron path={lenkeUrl}>
                { getTekst(lenkeTekstId, 'nb')}
            </LenkeMedChevron>
        </Feilmelding>
    );
};

export default FeilmeldingManglerArbeidstillatelse;
