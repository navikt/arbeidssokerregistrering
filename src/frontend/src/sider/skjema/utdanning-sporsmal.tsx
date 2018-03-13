import * as React from 'react';
import antallSporsmal from '../../sporsmal/alle-sporsmal';
import { Panel } from 'nav-frontend-paneler';
import Alternativ from './alternativ';

interface Props {
    children: {};
    navnPaaSporsmal: string;
    settSvarPaaSporsmal: (sporsmal, svar) => {};
}

export default function Sporsmal(props: Props) {
    return (
        <Panel className="panel-skjema">
            <form className={`form-flex form-skjema`}>

            </form>
        </Panel>
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


<Sporsmal>
    <Systemtittel> tittel </Systemtittel>
    <Alternativ> alternativ1 </Alternativ>
    <Alternativ> alternativ1 </Alternativ className="kult-spm">
</Sporsmal>


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