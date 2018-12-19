import * as React from 'react';
import { AndreForholdSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalAndreForhold: React.SFC<SporsmalProps> = () => {

    return (
        <Sporsmal sporsmalId={SporsmalId.andreForhold} visInfoTekst={true}>
            <Alternativ
                svar={AndreForholdSvar.JA}
                sporsmalId={SporsmalId.andreForhold}
            />
            <Alternativ
                svar={AndreForholdSvar.NEI}
                sporsmalId={SporsmalId.andreForhold}
            />
        </Sporsmal>
    );
};

export default SporsmalAndreForhold;
