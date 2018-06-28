import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForSvar } from '../skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function AndreForhold(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (alternativId: number) => props.endreSvar(props.sporsmalId, alternativId),
        getTekstId: (alternativId: number) => getTekstIdForSvar(props.sporsmalId, alternativId),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    return (
        <>
            <div className="sporsmal__oppe">
                <Innholdstittel tag="h1" className="spm-tittel">
                    {props.intl.messages[`${props.sporsmalId}-tittel`]}
                </Innholdstittel>
                <Normaltekst className="spm-ingress">
                    {props.intl.messages[`${props.sporsmalId}-ingress`]}
                </Normaltekst>
            </div>
            <form className="form-skjema">
                <Alternativ alternativId={1} {...fellesProps}/>
                <Alternativ alternativId={2} {...fellesProps}/>
            </form>
            <div className="spm-info">
                <span className="spm-info__ikon" aria-label="info">
                    <Ikon kind="info-sirkel" size="1.5em"/>
                </span>
                <Normaltekst>
                    {props.intl.messages[`${props.sporsmalId}-info`]}
                </Normaltekst>
            </div>
        </>
    );
}
