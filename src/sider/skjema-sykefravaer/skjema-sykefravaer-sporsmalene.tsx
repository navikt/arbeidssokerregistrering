import * as React from 'react';
import Utdanningsporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning';
import { SporsmalId } from '../../ducks/svar';
import UtdanningBestattSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-godkjent';
import AndreForhold from '../skjema-registrering/sporsmal/sporsmal-andre-forhold';
import { Link } from 'react-router-dom';
import SporsmalTilbakeIArbeid from './sporsmal/sporsmal-tilbake-i-arbeid';
import { hentLoepConfig } from './inngangssporsmal-svar-alternativene';
import {
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';
import { FormattedMessage } from 'react-intl';
import OppsummeringElement from '../../sider/oppsummering/oppsummering-element';
const tilbakeIArbeid = (fellesProps, regType) => {
    return {
        id: SporsmalId.tilbakeIArbeid,
        element: (
            <SporsmalTilbakeIArbeid
                key={SporsmalId.tilbakeIArbeid}
                sporsmalId={SporsmalId.tilbakeIArbeid}
                {...fellesProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                sporsmalId={SporsmalId.tilbakeIArbeid}
            >
                <strong>Tilbake i jobb: &nbsp;</strong>
            </OppsummeringElement>
        )
    };
};
const utdanningOgAndreForhold = (fellesProps, regType) => [
    {
        id: SporsmalId.utdanning,
        element: (
            <Utdanningsporsmal
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
                {...fellesProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                sporsmalId={SporsmalId.utdanning}
                skjulHvisSvarErLik={UtdanningSvar.INGEN_SVAR}
            >
                <strong><FormattedMessage id="oppsummering-utdanning-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanningGodkjent,
        element: (
            <UtdanningGodkjentSporsmal
                key={SporsmalId.utdanningGodkjent}
                sporsmalId={SporsmalId.utdanningGodkjent}
                {...fellesProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                sporsmalId={SporsmalId.utdanningGodkjent}
                skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
            >
                <strong>Utdanning godkjent: &nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanningBestatt,
        element: (
            <UtdanningBestattSporsmal
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
                {...fellesProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                sporsmalId={SporsmalId.utdanningBestatt}
                skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
            >
                <strong>Utdanning bestått: &nbsp;</strong>
            </OppsummeringElement>

        )
    },
    {
        id: SporsmalId.andreForhold,
        element: (
            <AndreForhold
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
                {...fellesProps}
                registeringType={regType}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement sporsmalId={SporsmalId.andreForhold}>
                <strong>Andre forhold: &nbsp;</strong>
            </OppsummeringElement>
        )
    }
];

export const sammeArbeidsgiverSporsmaleneConfig = (fellesProps, regType) => [
    tilbakeIArbeid(fellesProps, regType)
];
export const sammeArbeidsgiverNyStillingSporsmaleneConfig = (fellesProps, regType) => [
    tilbakeIArbeid(fellesProps, regType)
];
export const nyArbeidsgiverSporsmaleneConfig = (fellesProps, regType) =>
    utdanningOgAndreForhold(fellesProps, regType);

export const usikkerSporsmaleneConfig = (fellesProps, regType) =>
    utdanningOgAndreForhold(fellesProps, regType);

export const hentLenkeEndre = (sporsmalId, svar, lop) => {
    const config = hentLoepConfig({}, svar);

    if (SporsmalId.fremtidigSituasjon === sporsmalId) {
        return (
            <Link
                className="lenke"
                to="/inngangssporsmal"
            >
                Endre
            </Link>
        );
    }

    return config && config({}, '').map((spmElement, index) => {
            if (spmElement.id === sporsmalId) {
                return (
                    <Link
                        className="lenke"
                        to={`/skjema-sykefravaer/${lop}/${index}`}
                    >
                        Endre
                    </Link>
                );
            }
            return null;
        });
};
