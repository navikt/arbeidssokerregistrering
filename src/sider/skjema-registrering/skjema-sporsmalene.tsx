import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SporsmalId } from '../../ducks/svar';
import AndreForhold from '../../komponenter/sporsmal/sporsmal-andre-forhold';
import SporsmalDinSituasjon from '../../komponenter/sporsmal/sporsmal-din-situasjon';
import HelseHinder from '../../komponenter/sporsmal/sporsmal-helse-hinder';
import SisteStilling from '../../komponenter/sporsmal/siste-stilling/sporsmal-siste-stilling';
import Utdanningsporsmal from '../../komponenter/sporsmal/sporsmal-utdanning';
import UtdanningGodkjentSporsmal from '../../komponenter/sporsmal/sporsmal-utdanning-godkjent';
import UtdanningBestattSporsmal from '../../komponenter/sporsmal/sporsmal-utdanning-bestatt';
import { Link } from 'react-router-dom';
import { ingenYrkesbakgrunn } from '../../ducks/siste-stilling';
import OppsummeringElement from '../../sider/oppsummering/oppsummering-element';
import { UtdanningBestattSvar, UtdanningGodkjentSvar, UtdanningSvar } from '../../ducks/svar-utils';

const sporsmaleneConfig = (regType, state) => [
    {
        id: SporsmalId.dinSituasjon,
        element: (
            <SporsmalDinSituasjon
                key={SporsmalId.dinSituasjon}
                sporsmalId={SporsmalId.dinSituasjon}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.dinSituasjon}
                sporsmalId={SporsmalId.dinSituasjon}
            >
                <strong><FormattedMessage id="oppsummering-situasjon-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.sisteStilling,
        element: (
            <SisteStilling
                key={SporsmalId.sisteStilling}
                sporsmalId={SporsmalId.sisteStilling}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.sisteStilling}
                sporsmalId={SporsmalId.sisteStilling}
                tekst={state.sisteStilling && state.sisteStilling.data.stilling.label}
                skjul={state.sisteStilling && state.sisteStilling.data.stilling === ingenYrkesbakgrunn}
            >
                <strong><FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    },
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
                <strong><FormattedMessage id="oppsummering-utdanning-godkjent-fortekst"/>&nbsp;</strong>
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
                <strong><FormattedMessage id="oppsummering-utdanning-bestatt-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    },
    {
        id: SporsmalId.helseHinder,
        element: (
            <HelseHinder
                key={SporsmalId.helseHinder}
                sporsmalId={SporsmalId.helseHinder}
            />
        ),
        elementOppsummering: (
            <OppsummeringElement
                key={SporsmalId.helseHinder}
                sporsmalId={SporsmalId.helseHinder}
            >
                <strong><FormattedMessage id="oppsummering-helse-hinder-fortekst"/>&nbsp;</strong>
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
                <strong><FormattedMessage id="oppsummering-andre-forhold-fortekst"/>&nbsp;</strong>
            </OppsummeringElement>
        )
    }
];

export const finnLenkeEndreElementForOrdinaer = (regType, sporsmalId) => {
    const index = sporsmaleneConfig(regType, {})
        .findIndex(data => data.id === sporsmalId);
    if (index >= 0) {
        return (
            <Link
                className="lenke"
                to={`/skjema/${index}`}
            >
                Endre
            </Link>
        );
    } else {
        return null;
    }
};

export const hentElementOppsummering = (state) =>
    sporsmaleneConfig('', state).map((spmElement) => {
        return spmElement.elementOppsummering;
    });

const hentRegistreringSporsmalene = (regType) =>
    sporsmaleneConfig(regType, {}).map((spmElement) => {
        return spmElement.element;
    });

export default hentRegistreringSporsmalene;
