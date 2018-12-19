import * as React from 'react';
import Utdanningsporsmal from '../../komponenter/sporsmal/sporsmal-utdanning';
import { SporsmalId } from '../../ducks/svar';
import UtdanningBestattSporsmal from '../../komponenter/sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from '../../komponenter/sporsmal/sporsmal-utdanning-godkjent';
import AndreForhold from '../../komponenter/sporsmal/sporsmal-andre-forhold';
import { Link } from 'react-router-dom';
import SporsmalTilbakeIArbeid from '../../komponenter/sporsmal/sporsmal-tilbake-i-arbeid';
import { hentLoepConfig } from './inngangssporsmal-svar-alternativene';
import {
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';
import { FormattedMessage } from 'react-intl';
import OppsummeringElement from '../../sider/oppsummering/oppsummering-element';
const tilbakeIArbeid = () => {
    return {
        id: SporsmalId.tilbakeIArbeid,
        element: (
            <SporsmalTilbakeIArbeid
                key={SporsmalId.tilbakeIArbeid}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.tilbakeIArbeid}
                sporsmalId={SporsmalId.tilbakeIArbeid}
            >
                <strong><FormattedMessage id="sykmeldt-oppsummering-tilbake-i-jobb-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    };
};
const utdanningOgAndreForhold = () => [
    {
        id: SporsmalId.utdanning,
        element: (
            <Utdanningsporsmal
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanning}
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
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanningGodkjent}
                sporsmalId={SporsmalId.utdanningGodkjent}
                skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
            >
                <strong>
                    <FormattedMessage id="oppsummering-utdanning-godkjent-fortekst"/>&nbsp;
                </strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.utdanningBestatt,
        element: (
            <UtdanningBestattSporsmal
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.utdanningBestatt}
                sporsmalId={SporsmalId.utdanningBestatt}
                skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
            >
                <strong>
                    <FormattedMessage id="oppsummering-utdanning-bestatt-fortekst"/>&nbsp;
                </strong>
            </OppsummeringElement>

        )
    },
    {
        id: SporsmalId.andreForhold,
        element: (
            <AndreForhold
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.andreForhold}
                sporsmalId={SporsmalId.andreForhold}
            >
                <strong>
                    <FormattedMessage id="sykmeldt-oppsummering-andre-hensyn-fortekst"/>&nbsp;
                </strong>
            </OppsummeringElement>
        )
    }
];

export const sammeArbeidsgiverSporsmaleneConfig = () => [
    tilbakeIArbeid()
];
export const sammeArbeidsgiverNyStillingSporsmaleneConfig = () => [
    tilbakeIArbeid()
];
export const nyArbeidsgiverSporsmaleneConfig = () =>
    utdanningOgAndreForhold();

export const usikkerSporsmaleneConfig = () =>
    utdanningOgAndreForhold();

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
    const index = config
        ? config().findIndex(data => data.id === sporsmalId)
        : -1;

    if (index >= 0) {
        return (
            <Link
                className="lenke"
                to={`/skjema-sykefravaer/${lop}/${index}`}
            >
                Endre
            </Link>
        );
    } else {
        return null;
    }
};
