import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekst, getTekstIdForSvar } from '../skjema-utils';
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
    const { intl, sporsmalId } = props;
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    const getTekst = (kontekst: string) => getIntlTekst(sporsmalId, kontekst, intl);

    return (
        <>
            <div className="spm-hode">
                <Innholdstittel tag="h1" className="spm-tittel">
                    {getTekst('tittel')}
                </Innholdstittel>
                <Normaltekst className="spm-ingress">
                    {getTekst('ingress')}
                </Normaltekst>
            </div>
            <form className="spm-skjema">
                <Alternativ svar={AndreForholdSvar.JA} {...fellesProps}/>
                <Alternativ svar={AndreForholdSvar.NEI} {...fellesProps}/>
            </form>
            <div className="spm-info">
                <span className="spm-info__ikon" aria-label="info">
                    <Ikon kind="info-sirkel" size="1.5em"/>
                </span>
                <Normaltekst>
                    {getTekst('info')}
                </Normaltekst>
            </div>
        </>
    );
}
