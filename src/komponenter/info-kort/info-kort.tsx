import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import './info-kort.less';
import LenkeMedChevron from '../lenke-med-chevron/lenke-med-chevron';

type InfoKortProps = {
    bilde: string,
    bildeBeskrivelse: string
    tittel: string,
    beskrivelse: string
    lenke: string
    lenkeTekst: string
};

const InfoKort: React.SFC<InfoKortProps> = (props: InfoKortProps) => {
    return (
        <div className="info-kort">
            <img src={props.bilde} alt={props.bildeBeskrivelse}/>
            <Undertittel><FormattedMessage id={props.tittel}/></Undertittel>
            <Normaltekst className="beskrivelse">
                <FormattedMessage id={props.beskrivelse}/>
            </Normaltekst>
            <LenkeMedChevron path={props.lenke}>
                <FormattedMessage id={props.lenkeTekst}/>
            </LenkeMedChevron>
        </div>
    );
};

export default InfoKort;
