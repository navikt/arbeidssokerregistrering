import * as React from 'react';
import { SporsmalId } from '../../ducks/svar';
import AndreForhold from './sporsmal/sporsmal-andre-forhold';
import SporsmalDinSituasjon from './sporsmal/sporsmal-din-situasjon';
import HelseHinder from './sporsmal/sporsmal-helse-hinder';
import SisteStilling from './sporsmal/sporsmal-siste-stilling/siste-stilling';
import Utdanningsporsmal from './sporsmal/sporsmal-utdanning';
import UtdanningGodkjentSporsmal from './sporsmal/sporsmal-utdanning-godkjent';
import UtdanningBestattSporsmal from './sporsmal/sporsmal-utdanning-bestatt';
import { Link } from 'react-router-dom';

const sporsmaleneConfig = (sporsmalProps, regType) => [
    {
        id: SporsmalId.dinSituasjon,
        element: (
            <SporsmalDinSituasjon
                key={SporsmalId.dinSituasjon}
                sporsmalId={SporsmalId.dinSituasjon}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.sisteStilling,
        element: (
            <SisteStilling
                key={SporsmalId.sisteStilling}
                sporsmalId={SporsmalId.sisteStilling}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.utdanning,
        element: (
            <Utdanningsporsmal
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.utdanningGodkjent,
        element: (
            <UtdanningGodkjentSporsmal
                key={SporsmalId.utdanningGodkjent}
                sporsmalId={SporsmalId.utdanningGodkjent}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.utdanningBestatt,
        element: (
            <UtdanningBestattSporsmal
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.helseHinder,
        element: (
            <HelseHinder
                key={SporsmalId.helseHinder}
                sporsmalId={SporsmalId.helseHinder}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    },
    {
        id: SporsmalId.andreForhold,
        element: (
            <AndreForhold
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
                {...sporsmalProps}
                registeringType={regType}
            />
        )
    }
];

export const finnLenkeEndreElementForOrdinaer = (sporsmalProps, regType, sporsmalId) =>
    sporsmaleneConfig(sporsmalProps, regType).map((spmElement, index) => {
        if (spmElement.id === sporsmalId) {
            return (
                <Link
                    className="lenke"
                    to={`/skjema/${index}`}
                >
                    Endre
                </Link>
            );
        }
        return null;
    });

const hentRegistreringSporsmalene = (sporsmalProps, regType) =>
    sporsmaleneConfig(sporsmalProps, regType).map((spmElement) => {
        return spmElement.element;
    });

export default hentRegistreringSporsmalene;
