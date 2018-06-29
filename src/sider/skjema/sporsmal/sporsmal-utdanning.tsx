import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForSvar } from '../skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Svar, UtdanningSvar } from '../../../ducks/svar-utils';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: string) => Svar | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function Utdanningsporsmal(props: Props) {
    const fellesProps = {
        intl: props.intl,
        avgiSvar: (svar: Svar) => props.endreSvar(props.sporsmalId, svar),
        getTekstId: (svar: Svar) => getTekstIdForSvar(props.sporsmalId, svar),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    return (
        <>
            <div className="spm-hode">
                <Innholdstittel tag="h1" className="spm-tittel">
                    {props.intl.messages[`${props.sporsmalId}-tittel`]}
                </Innholdstittel>
            </div>
            <form className="spm-skjema">
                <Alternativ svar={UtdanningSvar.INGEN_UTDANNING} {...fellesProps}/>
                <Alternativ svar={UtdanningSvar.GRUNNSKOLE} {...fellesProps}/>
                <Alternativ svar={UtdanningSvar.VIDEREGAENDE_GRUNNUTDANNING} {...fellesProps}/>
                <Alternativ svar={UtdanningSvar.VIDEREGAENDE_FAGBREV_SVENNEBREV} {...fellesProps}/>
                <Alternativ svar={UtdanningSvar.HOYERE_UTDANNING_1_TIL_4} {...fellesProps}/>
                <Alternativ svar={UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER} {...fellesProps}/>
            </form>
        </>
    );
}
