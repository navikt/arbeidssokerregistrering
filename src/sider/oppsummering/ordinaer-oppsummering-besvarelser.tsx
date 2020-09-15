import * as React from 'react';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';
import OppsummeringElement from './oppsummering-element';
import { AppState } from '../../reducer';
import './ordinaer-oppsummering-besvarelser.less';
import { hentElementOppsummering } from '../skjema-registrering/skjema-sporsmalene';

const oppsummeringSvg = require('./oppsummering.svg');

interface OwnProps {
    state: AppState;
}

const OrdinaerOppsummeringBesvarelser = ({state}: OwnProps) => {

    const svar = state.svar;

    const registreringStatus = state.registreringStatus.data;
    const jobbetSeksAvTolvSisteManederTekstId = getTekstIdForArbeidSisteManeder(svar, registreringStatus);

    const element = hentElementOppsummering(state);

    return (
        <div className="ordinaer-oppsummering-besvarelser">
            <img
                src={oppsummeringSvg}
                alt="Oppsummering sjekkliste"
                className="ordinaer-oppsummering-besvarelser__illustrasjon"
            />
            <ul className="ordinaer-oppsummering-besvarelser__list">
                <OppsummeringElement
                    tekstId={jobbetSeksAvTolvSisteManederTekstId}
                    skjul={jobbetSeksAvTolvSisteManederTekstId === ''}
                />
                {element}
            </ul>
        </div>
    );
};

export default OrdinaerOppsummeringBesvarelser;
