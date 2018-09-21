import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../skjema-utils';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import Ikon from 'nav-frontend-ikoner-assets';
import { HelseHinderSvar, Svar } from '../../../ducks/svar-utils';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function HelseHinder(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl);

    return (
        <>
            <form className="spm-skjema">
                <fieldset className="skjema__fieldset">
                    <legend className="skjema__legend spm-hode">
                        <Innholdstittel tag="h1" className="spm-tittel">
                            {getTekst('tittel')}
                        </Innholdstittel>
                    </legend>
                    <div className="spm-body">
                        <Alternativ svar={HelseHinderSvar.JA} {...fellesProps}/>
                        <Alternativ svar={HelseHinderSvar.NEI} {...fellesProps}/>
                    </div>
                </fieldset>
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
