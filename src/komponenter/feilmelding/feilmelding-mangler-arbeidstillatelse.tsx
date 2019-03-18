import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import LenkeMedChevron from '../../komponenter/lenke-med-chevron/lenke-med-chevron';
import { InjectedIntlProps } from 'react-intl';
import Feilmelding from './feilmelding';
import utropstegnSvg from '../../sider/fullfor/utropstegn.svg';
import { erIFSS } from '../../utils/fss-utils';
import { lagAktivitetsplanUrl } from '../../utils/url-utils';
import './feilmelding-mangler-arbeidstillatelse.less';

const FeilmeldingManglerArbeidstillatelse: React.SFC<InjectedIntlProps> = (props: InjectedIntlProps) => {

    let innholdId = 'feilmelding-mangler-arbeidstillatelse-innhold';
    let lenkeTekstId = 'feilmelding-mangler-arbeidstillatelse-lenke-tekst';
    let lenkeUrl = props.intl.messages['finn-ditt-nav-kontor-lenke-url'];

    if (erIFSS()) {
        innholdId += '-fss';
        lenkeTekstId += '-fss';
        lenkeUrl = lagAktivitetsplanUrl();
    }

    return (
        <Feilmelding bilde={utropstegnSvg} className="feilmelding-mangler-arbeidstillatelse">
            <Normaltekst className="blokk-s">
                <FormattedMessage id={innholdId}/>
            </Normaltekst>
            <LenkeMedChevron path={lenkeUrl}>
                <FormattedMessage id={lenkeTekstId}/>
            </LenkeMedChevron>
        </Feilmelding>
    );
};

export default FeilmeldingManglerArbeidstillatelse;
