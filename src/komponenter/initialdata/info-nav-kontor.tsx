import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as React from 'react';
import { amplitudeLogger } from '../../metrikker/amplitude-utils';
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import navKontorSvg from './nav-kontor.svg';

const InfoNavKontor = () => {
    const { location } = window;
    const lenke = 'https://tjenester.nav.no/nav-sok';
    const amplitudeNameInternalSite = 'Går til intern side';

    const getRetningFraNAV = () => /nav.no/.test(lenke) ? 'inn' : 'ut';
    const handleUtgangsLenkeKlikk = (amplitudeName) => {
        const data = {
            side: location.pathname,
            retning: getRetningFraNAV(),
            lenke
        };
        amplitudeLogger(amplitudeName, data);
        return true;
    };
    const Lenke = () => {
        return (
            <LenkeMedChevron
                path={lenke}
                target="_blank"
                onClick={ () => handleUtgangsLenkeKlikk(amplitudeNameInternalSite) }
            >
                <FormattedMessage id="manuell-hjelp-lenketekst"/>
            </LenkeMedChevron>
        );
    }
    return (
        <div className="info-kort">
            <img src={navKontorSvg} alt="NAV-kontor illustrasjon"/>
            <Undertittel><FormattedMessage id="overskrift-manuell-hjelp-stepup"/></Undertittel>
            <Normaltekst className="blokk-s">
                <FormattedHTMLMessage id="beskrivelse-manuell-hjelp-stepup"/>
            </Normaltekst>
            <Lenke />
        </div>
    );
};

export default InfoNavKontor;
