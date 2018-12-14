import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningGodkjentSvar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import { injectIntl } from 'react-intl';
import { SporsmalId } from '../../../ducks/svar';

type Props = SporsmalProps & InjectedIntlProps;

function UtdanningGodkjentSporsmal(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        avgiSvar: (svar: Svar) => props.endreSvar(SporsmalId.utdanningGodkjent, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(SporsmalId.utdanningGodkjent, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(SporsmalId.utdanningGodkjent),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(SporsmalId.utdanningGodkjent.toString(),
        kontekst, props.intl, props.registeringType);

    return (
        <form className="spm-skjema">
            <fieldset className="skjema__fieldset">
            <legend className="skjema__legend spm-hode">
                <Innholdstittel tag="h1" className="spm-tittel">
                    {getTekst('tittel')}
                </Innholdstittel>
            </legend>
            <div className="spm-body">
                <Alternativ svar={UtdanningGodkjentSvar.JA} {...fellesProps}/>
                <Alternativ svar={UtdanningGodkjentSvar.NEI} {...fellesProps}/>
                <Alternativ svar={UtdanningGodkjentSvar.VET_IKKE} {...fellesProps}/>
            </div>
            </fieldset>
        </form>
    );
}

export default injectIntl(UtdanningGodkjentSporsmal);
