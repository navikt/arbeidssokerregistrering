import * as React from 'react';
import Utdanningsporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning';
import { SporsmalId } from '../../ducks/svar';
import UtdanningBestattSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from '../skjema-registrering/sporsmal/sporsmal-utdanning-godkjent';
import AndreForhold from '../skjema-registrering/sporsmal/sporsmal-andre-forhold';
import { Link } from 'react-router-dom';
import SporsmalTilbakeIArbeid from './sporsmal/sporsmal-tilbake-i-arbeid';
import { hentLoepConfig } from './inngangssporsmal-config';
import {
    Svar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar
} from '../../ducks/svar-utils';
import { FormattedMessage } from 'react-intl';
import OppsummeringElement from '../../sider/oppsummering/oppsummering-element';
import { RegistreringType } from '../../ducks/registreringstatus';

interface SporsmalProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
    hentAvgittSvar: (sporsmalId: SporsmalId) => Svar | undefined;
    registeringType: RegistreringType;
}
interface KonfigVerdi {
    id: SporsmalId;
    element: any; //tslint:disable-line
    elementOppsummering: any; //tslint:disable-line
}

export type lopConfigType = (sporsmalProps: SporsmalProps) => KonfigVerdi[];

const tilbakeIArbeid: lopConfigType = (sporsmalProps: SporsmalProps) => [
    {
        id: SporsmalId.tilbakeIArbeid,
        element: (
            <SporsmalTilbakeIArbeid
                key={SporsmalId.tilbakeIArbeid}
                sporsmalId={SporsmalId.tilbakeIArbeid}
                {...sporsmalProps}
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
    }
];
const utdanningOgAndreForhold = (sporsmalProps: SporsmalProps) => [
    {
        id: SporsmalId.utdanning,
        element: (
            <Utdanningsporsmal
                key={SporsmalId.utdanning}
                sporsmalId={SporsmalId.utdanning}
                {...sporsmalProps}
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
                {...sporsmalProps}
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
                {...sporsmalProps}
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
                {...sporsmalProps}
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

export const sammeArbSporsmalConfig: lopConfigType = (sporsmalProps: SporsmalProps) =>
    tilbakeIArbeid(sporsmalProps);

export const sammeArbNyStillingSporsmalConfig: lopConfigType = (sporsmalProps: SporsmalProps) =>
    tilbakeIArbeid(sporsmalProps);

export const nyArbSporsmalConfig: lopConfigType = (sporsmalProps: SporsmalProps) =>
    utdanningOgAndreForhold(sporsmalProps);

export const usikkerSporsmalConfig: lopConfigType = (sporsmalProps: SporsmalProps) =>
    utdanningOgAndreForhold(sporsmalProps);

export const hentLenkeEndre = (sporsmalId, svar, lop) => {
    const config = hentLoepConfig(svar);

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