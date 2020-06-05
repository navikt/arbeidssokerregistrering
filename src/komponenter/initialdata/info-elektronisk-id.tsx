import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as React from 'react';
import { amplitudeLogger } from '../../metrikker/amplitude-utils';
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import bankidSvg from './bankid.svg';

const InfoElektroniskId = () => {
    const { location } = window;
    const lenke = 'https://eid.difi.no/nb/bankid';
    const getRetningFraNAV = () => /nav.no/.test(lenke) ? 'inn' : 'ut';
    const handleUtgangsLenkeKlikk = () => {
        const data = {
            side: location.pathname,
            retning: getRetningFraNAV(),
            lenke
        };
        amplitudeLogger('lenke', data);
        return true;
    };
    const Lenke = () => {
        return (
            <LenkeMedChevron path={lenke} target="_blank" onClick={ handleUtgangsLenkeKlikk }>
                <FormattedMessage id="overskrift-elektronisk-hjelp-stepup"/>
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
            <Lenke />
        </div>
    );
};

export default InfoElektroniskId;
