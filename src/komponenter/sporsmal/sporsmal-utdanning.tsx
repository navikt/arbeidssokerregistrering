import * as React from 'react';
import { UtdanningSvar } from '../../ducks/svar-utils';
import { SporsmalId } from '../../ducks/svar';
import Alternativ from './alternativ';
import Sporsmal from './sporsmal';
import { SporsmalProps } from '../skjema/sporsmal-utils';

const SporsmalUtdanning: React.SFC<SporsmalProps> = () => {
    return (
        <Sporsmal sporsmalId={SporsmalId.utdanning}>
            <Alternativ
                svar={UtdanningSvar.INGEN_UTDANNING}
                sporsmalId={SporsmalId.utdanning}
            />
            <Alternativ
                svar={UtdanningSvar.GRUNNSKOLE}
                sporsmalId={SporsmalId.utdanning}
            />
            <Alternativ
                svar={UtdanningSvar.VIDEREGAENDE_GRUNNUTDANNING}
                sporsmalId={SporsmalId.utdanning}
            />
            <Alternativ
                svar={UtdanningSvar.VIDEREGAENDE_FAGBREV_SVENNEBREV}
                sporsmalId={SporsmalId.utdanning}
            />
            <Alternativ
                svar={UtdanningSvar.HOYERE_UTDANNING_1_TIL_4}
                sporsmalId={SporsmalId.utdanning}
            />
            <Alternativ
                svar={UtdanningSvar.HOYERE_UTDANNING_5_ELLER_MER}
                sporsmalId={SporsmalId.utdanning}
            />
        </Sporsmal>
    );
};

export default SporsmalUtdanning;
