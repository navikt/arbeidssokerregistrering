import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningSvar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';

type Props = SporsmalProps & InjectedIntlProps;

export default function Utdanningsporsmal(props: Props) {
    const fellesProps = {
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
                    <Innholdstittel tag="h1" className="spm-tittel">
                        {getTekst('tittel')}
                    </Innholdstittel>
                </legend>
                <div className="spm-body">
                    <Alternativ svar={UtdanningSvar.INGEN_UTDANNING} {...fellesProps}/>
                    <Alternativ svar={UtdanningSvar.GRUNNSKOLE} {...fellesProps}/>
                    <Alternativ svar={UtdanningSvar.VIDEREGAENDE_GRUNNUTDANNING} {...fellesProps}/>
                    <Alternativ svar={UtdanningSvar.VIDEREGAENDE_FAGBREV_SVENNEBREV} {...fellesProps}/>
                    <Alternativ svar={UtdanningSvar.HOYERE_UTDANNING_1_TIL_4} {...fellesProps}/>
                    <Alternativ svar={UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER} {...fellesProps}/>
                </div>
            </fieldset>
        </form>
    );
}
