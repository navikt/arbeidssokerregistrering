import * as React from 'react';
import { UtdanningBestattSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalUtdanningBestatt: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.utdanningBestatt}>
            <Alternativ
                svar={UtdanningBestattSvar.JA}
                sporsmalId={SporsmalId.utdanningBestatt}
            />
            <Alternativ
                svar={UtdanningBestattSvar.NEI}
                sporsmalId={SporsmalId.utdanningBestatt}
            />
        </Sporsmal>
    );
};

export default SporsmalUtdanningBestatt;
