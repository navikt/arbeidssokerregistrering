import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import * as React from 'react';
import { amplitudeLogger } from '../../metrikker/amplitude-utils'
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';
import { getTekst } from '../../utils/utils';

type InfoKortProps = {
    bilde: string;
    bildeBeskrivelse: string;
    tittel: string;
    beskrivelse: string;
    lenke?: string;
    lenkeTekst?: string;
    lenkeTarget?: string;
};

const InfoKort: React.SFC<InfoKortProps> = (props: InfoKortProps) => {
    const { location } = window;
    const getRetningFraNAV = lenke => /nav.no/.test(lenke) ? 'inn' : 'ut'
    const lenketekstId = props.lenkeTekst || ''
    const beskrivelseId = props.beskrivelse || ''
    const handleUtgangsLenkeKlikk = event => {
        const { lenke } = props
        const data = {
            side: location.pathname,
            retning: getRetningFraNAV(lenke),
            lenke
        }
        amplitudeLogger('lenke', data)
        return true
    }
    const Lenke = () => {
        return (
            <LenkeMedChevron path={props.lenke || ''} target={props.lenkeTarget} onClick={ handleUtgangsLenkeKlikk }>
                { getTekst(lenketekstId, 'nb') }
            </LenkeMedChevron>
        )
    }
    return (
        <div className="info-kort">
            <img src={props.bilde} alt={props.bildeBeskrivelse}/>
            <Undertittel><FormattedMessage id={props.tittel}/></Undertittel>
            <Normaltekst className="beskrivelse">
                { getTekst(beskrivelseId, 'nb') }
            </Normaltekst>
            {props.lenke ? <Lenke /> : null}
        </div>
    );
};

export default InfoKort;
