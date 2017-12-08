import * as React  from 'react';
import { RouteComponentProps } from 'react-router';
import Skjema from './skjema';

interface matchProps {
    id: string;
}

function SkjemaPanel({match}: RouteComponentProps<matchProps>) {
    return <Skjema id={match.params.id}/>;
}

export default SkjemaPanel;
