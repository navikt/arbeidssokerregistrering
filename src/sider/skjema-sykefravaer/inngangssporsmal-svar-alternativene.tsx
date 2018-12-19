import * as React from 'react';
import { FremtidigSituasjonSvar } from '../../ducks/svar-utils';
import Alternativ from '../../komponenter/sporsmal/alternativ';
import {
    nyArbeidsgiverSporsmaleneConfig,
    sammeArbeidsgiverNyStillingSporsmaleneConfig, sammeArbeidsgiverSporsmaleneConfig,
    usikkerSporsmaleneConfig
} from './skjema-sykefravaer-sporsmalene';
import { SporsmalId } from '../../ducks/svar';

const svarAlternativeConfig = () => [
    {
        id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER,
        element: (
            <Alternativ
                key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        ),
        lop: 1,
        lopConfig: sammeArbeidsgiverSporsmaleneConfig
    },
    {
        id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING,
        element: (
            <Alternativ
                key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        ),
        lop: 2,
        lopConfig: sammeArbeidsgiverNyStillingSporsmaleneConfig
    },
    {
        id: FremtidigSituasjonSvar.NY_ARBEIDSGIVER,
        element: (
            <Alternativ
                key={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
                svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        ),
        lop: 3,
        lopConfig: nyArbeidsgiverSporsmaleneConfig
    },
    {
        id: FremtidigSituasjonSvar.USIKKER,
        element: (
            <Alternativ
                key={FremtidigSituasjonSvar.USIKKER}
                svar={FremtidigSituasjonSvar.USIKKER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        ),
        lop: 4,
        lopConfig: usikkerSporsmaleneConfig
    },
    {
        id: FremtidigSituasjonSvar.INGEN_PASSER,
        element: (
            <Alternativ
                key={FremtidigSituasjonSvar.INGEN_PASSER}
                svar={FremtidigSituasjonSvar.INGEN_PASSER}
                sporsmalId={SporsmalId.fremtidigSituasjon}
            />
        ),
        lop: 0,
        lopConfig: undefined
    }
];

export const hentAlternativeneForInngangsporsmal = () =>
    svarAlternativeConfig().map((alternativ) => alternativ.element);

export const hentInngangsLoep = (inngangsLoepSvar) => {
    const lop = svarAlternativeConfig().find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lop;
};

export const hentLoepConfig = (alternativProps, inngangsLoepSvar) => {
    const lop = svarAlternativeConfig().find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lopConfig;
};