import * as React from 'react';
import Alternativ from '../alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import { getTekstIdForSvar } from '../skjema-utils';
import { Innholdstittel } from 'nav-frontend-typografi';

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function Utdanningsporsmal(props: Props) {
    const fellesProps = {
        intl: props.intl,
        avgiSvar: (alternativId: number) => props.endreSvar(props.sporsmalId, alternativId),
        getTekstId: (alternativId: number) => getTekstIdForSvar(props.sporsmalId, alternativId),
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
                <Alternativ alternativId={3} {...fellesProps}/>
                <Alternativ alternativId={4} {...fellesProps}/>
                <Alternativ alternativId={5} {...fellesProps}/>
                <Alternativ alternativId={6} {...fellesProps}/>
            </form>
        </>
    );
}
