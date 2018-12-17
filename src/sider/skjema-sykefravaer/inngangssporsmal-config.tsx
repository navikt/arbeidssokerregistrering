import * as React from 'react';
import { FremtidigSituasjonSvar, Svar } from '../../ducks/svar-utils';
import Alternativ from '../../komponenter/skjema/alternativ';
import {
    nyArbSporsmalConfig,
    sammeArbNyStillingSporsmalConfig, sammeArbSporsmalConfig,
    usikkerSporsmalConfig
} from './skjema-sykefravaer-sporsmalene';

interface SvarAlternativeProps {
    hentAvgittSvar: () => Svar | undefined;
    avgiSvar: (svar: Svar) => void;
    getTekstId: (svar: Svar) => string;
}

interface AlterantivConfig {
    id: FremtidigSituasjonSvar;
    element: any; //tslint:disable-line
    lopConfig: any; //tslint:disable-line
    lop: number;
}
type svarAlternativeConfigType = (alternativProps?: SvarAlternativeProps) => AlterantivConfig[];

const svarAlternativeConfig: svarAlternativeConfigType = (alternativProps?: SvarAlternativeProps) => [
    {
        id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER,
        element: alternativProps ? (
            <Alternativ
                key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER}
                {...alternativProps}
            />
        )
            : null,
        lop: 1,
        lopConfig: sammeArbSporsmalConfig
    },
    {
        id: FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING,
        element: alternativProps ? (
            <Alternativ
                key={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
                svar={FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING}
                {...alternativProps}
            />
        )
            : null,
        lop: 2,
        lopConfig: sammeArbNyStillingSporsmalConfig
    },
    {
        id: FremtidigSituasjonSvar.NY_ARBEIDSGIVER,
        element: alternativProps ? (
            <Alternativ
                key={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
                svar={FremtidigSituasjonSvar.NY_ARBEIDSGIVER}
                {...alternativProps}
            />
        )
            : null,
        lop: 3,
        lopConfig: nyArbSporsmalConfig
    },
    {
        id: FremtidigSituasjonSvar.USIKKER,
        element: alternativProps ? (
            <Alternativ
                key={FremtidigSituasjonSvar.USIKKER}
                svar={FremtidigSituasjonSvar.USIKKER}
                {...alternativProps}
            />
        )
            : null,
        lop: 4,
        lopConfig: usikkerSporsmalConfig
    },
    {
        id: FremtidigSituasjonSvar.INGEN_PASSER,
        element: alternativProps ? (
            <Alternativ
                key={FremtidigSituasjonSvar.INGEN_PASSER}
                svar={FremtidigSituasjonSvar.INGEN_PASSER}
                {...alternativProps}
            />
        )
            : null,
        lop: 0,
        lopConfig: undefined
    }
];

type hentSvarAlternativForInngangsporsmalType = (alternativProps: SvarAlternativeProps) => AlterantivConfig[];

export const hentSvarAlternativForInngangsporsmal
    : hentSvarAlternativForInngangsporsmalType = (alternativProps: SvarAlternativeProps) =>
    svarAlternativeConfig(alternativProps).map((alternativ) => alternativ.element);

export const hentInngangsLoep = (inngangsLoepSvar) => {
    const lop = svarAlternativeConfig().find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lop;
};

export const hentLoepConfig = (alternativProps, inngangsLoepSvar) => {
    const lop = svarAlternativeConfig(alternativProps).find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lopConfig;
};