import * as React from 'react';
import { HelseHinderSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalHelseHinder: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.helseHinder} visInfoTekst={true}>
            <Alternativ
                svar={HelseHinderSvar.JA}
                sporsmalId={SporsmalId.helseHinder}
            />
            <Alternativ
                svar={HelseHinderSvar.NEI}
                sporsmalId={SporsmalId.helseHinder}
            />
        </Sporsmal>
    );
};

export default SporsmalHelseHinder;
