import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningGodkjentSvar } from '../../../ducks/svar-utils';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function UtdanningGodkjentSporsmal(props: Props) {
    const ariaLabelledBy = 'spm-skjema-form';
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
        ariaLabelledBy
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl);
    return (
        <>
            <div className="spm-hode">
                <Innholdstittel tag="h1" className="spm-tittel">
                    {getTekst('tittel')}
                </Innholdstittel>
            </div>
            <form className="spm-skjema" id={ariaLabelledBy}>
                <Alternativ svar={UtdanningGodkjentSvar.JA} {...fellesProps}/>
                <Alternativ svar={UtdanningGodkjentSvar.NEI} {...fellesProps}/>
                <Alternativ svar={UtdanningGodkjentSvar.VET_IKKE} {...fellesProps}/>
            </form>
        </>
    );
}
