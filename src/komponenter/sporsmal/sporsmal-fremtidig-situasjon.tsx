import * as React from 'react';
import { FremtidigSituasjonSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalFremtidigSituasjon: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.fremtidigSituasjon}>
            <Alternativ
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
            <Alternativ
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
            <Alternativ
                svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
            <Alternativ
                svar={FremtidigSituasjonSvar.USIKKER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
            <Alternativ
                svar={FremtidigSituasjonSvar.INGEN_PASSER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        </Sporsmal>
    );
};

export default SporsmalFremtidigSituasjon;
