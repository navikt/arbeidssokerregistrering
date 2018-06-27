import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForAlternativ } from '../skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function UtdanningBestattSporsmal(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (alternativId: number) => props.endreSvar(props.sporsmalId, alternativId),
        getTekstId: (alternativId: number) => getTekstIdForAlternativ(props.sporsmalId, alternativId),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    return (
        <>
            <Innholdstittel tag="h1" className="spm-tittel">
                {props.intl.messages[`${props.sporsmalId}-tittel`]}
            </Innholdstittel>
            <form className="form-skjema">
                <Alternativ alternativId={1} {...fellesProps}/>
                <Alternativ alternativId={2} {...fellesProps}/>
            </form>
        </>
    );
}
