import * as React from 'react';
import { TilbakeIArbeidSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalTilbakeIArbeid: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.tilbakeIArbeid}>
            <Alternativ
                svar={TilbakeIArbeidSvar.JA_FULL_STILLING}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            />
            <Alternativ
                svar={TilbakeIArbeidSvar.JA_REDUSERT_STILLING}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            />
            <Alternativ
                svar={TilbakeIArbeidSvar.USIKKER}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            />
            <Alternativ
                svar={TilbakeIArbeidSvar.NEI}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            />
        </Sporsmal>
    );
};

export default SporsmalTilbakeIArbeid;
