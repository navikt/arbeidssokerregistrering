import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as React from 'react';
import { amplitudeLogger } from '../../metrikker/amplitude-utils';
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

type InfoKortProps = {
    bilde: string;
    bildeBeskrivelse: string;
    tittel: string;
    beskrivelse: string;
    lenke?: string;
    lenkeTekst?: string;
    lenkeTarget?: string;
};

const InfoKort = (props: InfoKortProps) => {
    const { location } = window;
    const getRetningFraNAV = lenke => /nav.no/.test(lenke) ? 'inn' : 'ut';
    const handleUtgangsLenkeKlikk = () => {
        const { lenke } = props;
        const data = {
            side: location.pathname,
            retning: getRetningFraNAV(lenke),
            lenke
        };
        amplitudeLogger('lenke', data);
        return true;
    };
    const Lenke = () => {
        return (
            <LenkeMedChevron path={props.lenke || ''} target={props.lenkeTarget} onClick={ handleUtgangsLenkeKlikk }>
                <FormattedMessage id={props.lenkeTekst || ''}/>
            </LenkeMedChevron>
        );
    }
    return (
        <div className="info-kort">
            <img src={props.bilde} alt={props.bildeBeskrivelse}/>
            <Undertittel><FormattedMessage id={props.tittel}/></Undertittel>
            <Normaltekst className="beskrivelse">
                <FormattedHTMLMessage id={props.beskrivelse}/>
            </Normaltekst>
            {props.lenke ? <Lenke /> : null}
        </div>
    );
};

export default InfoKort;
