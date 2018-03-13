import * as React from 'react';
import { Panel } from 'nav-frontend-paneler';

interface Props {
    children: {};
    navnPaaSporsmal: string;
    settSvarPaaSporsmal: (sporsmal, svar) => {};
}

export default function Sporsmal(props: Props) {
    return (
        <Panel className="panel-skjema">
            <form className={`form-flex form-skjema`}>
                {props.children}
            </form>
        </Panel>
    );
}