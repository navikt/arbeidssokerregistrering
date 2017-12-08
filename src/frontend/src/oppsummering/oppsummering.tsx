import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import { RouteComponentProps } from 'react-router';

function Oppsummering({ history }: RouteComponentProps<MatchProps>) {
    return(
        <Knapp type="hoved" onClick={() => history.push('/sblregistrering')}>
            UENIG
        </Knapp>
    );
}

export default Oppsummering;