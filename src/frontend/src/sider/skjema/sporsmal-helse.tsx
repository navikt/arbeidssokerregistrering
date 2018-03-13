import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';
import NyttAlternativ from './nytt-alternativ';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import getTekstIdForAlternativ from './sporsmal-utils';
import {Systemtittel} from "nav-frontend-typografi";

interface SporsmalProps {
    sporsmalId: string;
    endreSvar: (sporsmalId: string, svar: number) => void;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
}

type Props = SporsmalProps & InjectedIntlProps;

export default function Helsesporsmal(props: Props) {
    const fellesProps = {
        endreSvar: props.endreSvar,
        intl: props.intl,
        avgiSvar: (alternativId: number) => props.endreSvar(props.sporsmalId, alternativId),
        getTekstId: (alternativId: number) => getTekstIdForAlternativ(props.sporsmalId, alternativId),
        hentAvgittSvar: () => props.hentAvgittSvar(props.sporsmalId)
    };
    return (
        <div>
            <Systemtittel tag="h1" className="spm-tittel">
                {props.intl.messages[`${props.sporsmalId}-tittel`]}
            </Systemtittel>
            <Panel className="panel-skjema">
                <form className="form-flex form-skjema">
                    <NyttAlternativ alternativId={1} {...fellesProps}/>
                    <NyttAlternativ alternativId={2} {...fellesProps}/>
                </form>
            </Panel>
        </div>
    );
}

/*
<Tittel/>
                <NyttAlternativ tekstId="helse-alternativ-1"/>
                <NyttAlternativ tekstId="helse-alternativ-2"/>
                <Alternativ
                        sporsmalId={spmId}
                        endreSvar={endreSvar}
                        key={key}
                        alternativId={key.toString()}
                        tekstId={`sporsmal-${spmId}-alternativ-${key}`}
                        checked={key === parseInt(hentAvgittSvarId(spmId), 10)}
                        intl={intl}
                    />

<Skjema>
    <Sporsmal>
        <HelseutfordringerSporsmal navn="helse"/>
        <UtdanningSporsmal navn="utdanning"/>
    </Sporsmal>
    <nesteknapp/>
</Skjema>


<Helsesporsmal>
    <Systemtittel> tittel </Systemtittel>
    <Alternativ> alternativ1 </Alternativ>
    <Alternativ> alternativ1 </Alternativ className="kult-spm">
</Helsesporsmal>


state.svar = [
{
    sporsmal: "helse"
    svar: 2
},
{
    sporsmal: "utdanning"
    svar: 4
}
]

 */