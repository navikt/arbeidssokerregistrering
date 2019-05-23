import * as React from 'react';
import Alternativ from '../../../komponenter/skjema/alternativ';
import { getIntlTekstForSporsmal, getTekstIdForSvar, TekstKontekst } from '../../../komponenter/skjema/skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningSvar } from '../../../ducks/svar-utils';
import { SporsmalProps } from '../../../komponenter/skjema/sporsmal-utils';
import ReactIntl, { injectIntl } from 'react-intl';

type Props = SporsmalProps & ReactIntl.InjectedIntlProps;

function Utdanningsporsmal(props: Props) {
    const fellesProps = {
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId),
    };
    const getTekst = (kontekst: TekstKontekst) => getIntlTekstForSporsmal(props.sporsmalId,
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

export default injectIntl(Utdanningsporsmal);
