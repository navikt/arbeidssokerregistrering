import * as React from 'react';
import { UtdanningGodkjentSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalUtdanningGodkjent: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.utdanningGodkjent}>
            <Alternativ
                svar={UtdanningGodkjentSvar.JA}
                sporsmalId={SporsmalId.utdanningGodkjent}
            />
            <Alternativ
                svar={UtdanningGodkjentSvar.NEI}
                sporsmalId={SporsmalId.utdanningGodkjent}
            />
            <Alternativ
                svar={UtdanningGodkjentSvar.VET_IKKE}
                sporsmalId={SporsmalId.utdanningGodkjent}
            />
        </Sporsmal>
    );
};

export default SporsmalUtdanningGodkjent;
