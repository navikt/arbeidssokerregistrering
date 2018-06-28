import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForSvar } from '../skjema-utils';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { AndreForholdSvar, Svar } from '../../../ducks/svar-utils';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function AndreForhold(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
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
                <Alternativ svar={AndreForholdSvar.JA} {...fellesProps}/>
                <Alternativ svar={AndreForholdSvar.NEI} {...fellesProps}/>
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
