import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as React from 'react';
import { amplitudeLogger } from '../../metrikker/amplitude-utils';
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import bankidSvg from './bankid.svg';
import Lenke from 'nav-frontend-lenker';

const InfoElektroniskId = () => {
    const { location } = window;
    const lenkeBankID = 'https://eid.difi.no/nb/bankid';
    const lenkePassportIDEng = 'https://eid.difi.no/en/minid/passport';
    const lenkePassportIDNor = 'https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/minid-passport--mangler-du-elektronisk-id-til-navs-digitale-tjenester';

    const getRetningFraNAV = (lenke) => /nav.no/.test(lenke) ? 'inn' : 'ut';
    const handleUtgangsLenkeKlikk = (lenke) => {
        const data = {
            side: location.pathname,
            retning: getRetningFraNAV(lenke),
            lenke
        };
        amplitudeLogger('lenke', data);
        return true;
    };
    const LenkeBankID = ({classes}) => {
        return (
            <LenkeMedChevron path={lenkeBankID} target="_blank" onClick={ () => handleUtgangsLenkeKlikk(lenkeBankID) } className={classes}>
                <FormattedMessage id="overskrift-elektronisk-hjelp-stepup" />
            </LenkeMedChevron>
        );
    };
    return (
        <div className="info-kort">
            <img src={bankidSvg} alt="BankID illustrasjon"/>
            <Undertittel><FormattedMessage id="overskrift-elektronisk-hjelp-stepup"/></Undertittel>
            <Normaltekst className="blokk-s">
                <FormattedHTMLMessage id="beskrivelse-elektronisk-hjelp-stepup"/>
            </Normaltekst>
            <LenkeBankID classes="blokk-s" />
            <Undertittel>MinID Passport</Undertittel>
            <Normaltekst className="blokk-s">
                MinID Passport is an electronic ID solution which can be used to log into nav.no. MinID Passport&nbsp;
                <Lenke
                    href={lenkePassportIDEng}
                    target="_blank"
                    onClick={() => handleUtgangsLenkeKlikk(lenkePassportIDEng)}
                >
                    uses passport verification
                </Lenke>
                .
            </Normaltekst>
            <Normaltekst>MinID Passport er en elektronisk ID som kan brukes for å logge på nav.no. MinID Passport&nbsp;
                <Lenke
                    href={lenkePassportIDNor}
                    target="_blank"
                    onClick={() => handleUtgangsLenkeKlikk(lenkePassportIDNor)}
                >
                    bruker pass som bekreftelse
                </Lenke>
                .
            </Normaltekst>
        </div>
    );
};

export default InfoElektroniskId;
