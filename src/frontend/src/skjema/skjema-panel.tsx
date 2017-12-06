import * as React  from 'react';
import { Panel } from 'nav-frontend-paneler';
import { RouteComponentProps } from 'react-router';
import Skjema from "./skjema";
import { Knapp } from 'nav-frontend-knapper';

interface matchProps {
    id: string;
}

function SkjemaPanel({match}: RouteComponentProps<matchProps>) {
    return <Panel>
        <Skjema id={match.params.id}/>
    </Panel>
}

export default SkjemaPanel;
