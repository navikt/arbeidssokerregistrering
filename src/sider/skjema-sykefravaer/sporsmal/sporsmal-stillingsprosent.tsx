import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { InjectedIntlProps } from 'react-intl';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, StillingsprosentSvar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';

type Props = SporsmalProps & InjectedIntlProps;

export default function SporsmalStillingsprosent(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId, kontekst, props.intl);
    return (
        <form className="spm-skjema">
            <fieldset className="skjema__fieldset">
            <legend className="skjema__legend spm-hode">
                <Innholdstittel tag="h1" className="spm-tittel blokk-xxxl">
                    {getTekst('tittel')}
                </Innholdstittel>
            </legend>
            <div className="spm-body blokk-xxxl">
                <Alternativ svar={StillingsprosentSvar.HELT} {...fellesProps}/>
                <Alternativ svar={StillingsprosentSvar.REDUSERT} {...fellesProps}/>
            </div>
            </fieldset>
        </form>
    );
}
