import * as React from 'react';
import { FremtidigSituasjonSvar, Svar } from '../../ducks/svar-utils';
import Alternativ from '../../komponenter/skjema/alternativ';
import {
    nyArbSporsmalConfig,
    sammeArbNyStillingSporsmalConfig, sammeArbSporsmalConfig,
    usikkerSporsmalConfig
} from './skjema-sykefravaer-config';
import { SKJEMA_SYKEFRAVAER_PATH } from '../../utils/konstanter';
import SkjemaSykefravaer from './skjema-sykefravaer';
import {
    skjemaFlytIngenUtdanning,
    vanligFlyt
} from '../../komponenter/skjema/skjema-utils';
import { Route } from 'react-router';

interface SvarAlternativeProps {
    hentAvgittSvar: () => Svar | undefined;
    avgiSvar: (svar: Svar) => void;
    getTekstId: (svar: Svar) => string;
}

interface KonfigVerdi {
    id: FremtidigSituasjonSvar;
    element: any; //tslint:disable-line
    lopConfig: any; //tslint:disable-line
    routeElement: any; //tslint:disable-line
    lop: number;
}
type svarAlternativeConfigType = (alternativProps?: SvarAlternativeProps) => KonfigVerdi[];

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
        lopConfig: sammeArbSporsmalConfig,
        routeElement: (
            <Route
                path={`${SKJEMA_SYKEFRAVAER_PATH}/1/:id`}
                render={(props) => <SkjemaSykefravaer
                    {...props}
                    lop={1}
                    lopConfig={sammeArbSporsmalConfig}
                    skjemaConfig={vanligFlyt}
                />}
            />
        )
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
        lopConfig: sammeArbNyStillingSporsmalConfig,
        routeElement: (
            <Route
                path={`${SKJEMA_SYKEFRAVAER_PATH}/2/:id`}
                render={(props) => <SkjemaSykefravaer
                    {...props}
                    lop={2}
                    lopConfig={sammeArbNyStillingSporsmalConfig}
                    skjemaConfig={skjemaFlytIngenUtdanning}
                />}
            />
        )
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
        lopConfig: nyArbSporsmalConfig,
        routeElement: (
            <Route
                path={`${SKJEMA_SYKEFRAVAER_PATH}/3/:id`}
                render={(props) => <SkjemaSykefravaer
                    {...props}
                    lop={3}
                    lopConfig={nyArbSporsmalConfig}
                    skjemaConfig={skjemaFlytIngenUtdanning}
                />}
            />
        )
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
        lopConfig: usikkerSporsmalConfig,
        routeElement: (
            <Route
                path={`${SKJEMA_SYKEFRAVAER_PATH}/4/:id`}
                render={(props) => <SkjemaSykefravaer
                    {...props}
                    lop={4}
                    lopConfig={usikkerSporsmalConfig}
                    skjemaConfig={skjemaFlytIngenUtdanning}
                />}
            />
        )
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
        lopConfig: undefined,
        routeElement: undefined
    }
];

type hentSvarAlternativForInngangsporsmalType = (alternativProps?: SvarAlternativeProps) => KonfigVerdi[];

export const hentSvarAlternativForInngangsporsmal
    : hentSvarAlternativForInngangsporsmalType = (alternativProps: SvarAlternativeProps) =>
    svarAlternativeConfig(alternativProps).map((alternativ) => alternativ.element);

export const hentRoutesInngangssporsmal
    : hentSvarAlternativForInngangsporsmalType = () =>
    svarAlternativeConfig().map((alternativ) => alternativ.routeElement);

export const hentInngangsLoep = (inngangsLoepSvar: FremtidigSituasjonSvar | undefined) => {
    const lop: KonfigVerdi | undefined = svarAlternativeConfig().find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lop;
};

export const hentLoepConfig = (inngangsLoepSvar: FremtidigSituasjonSvar | undefined) => {
    const lop: KonfigVerdi | undefined = svarAlternativeConfig().find((alternativ) =>
        alternativ.id === inngangsLoepSvar
    );
    return lop && lop.lopConfig;
};