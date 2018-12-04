import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';
import { SporsmalId } from '../../ducks/svar';
import { ingenYrkesbakgrunn } from '../../ducks/siste-stilling';
import { UtdanningBestattSvar, UtdanningGodkjentSvar, UtdanningSvar } from '../../ducks/svar-utils';
import OppsummeringElement from './oppsummering-element';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import './ordinaer-oppsummering-besvarelser.less';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    state: AppState;
}

class OrdinaerOppsummeringBesvarelser extends React.Component<StateProps> {

    render() {
        const { state } = this.props;
        const svar = state.svar;

        if (_.isEmpty(svar)) {
            return null;
        }

        const registreringStatus = state.registreringStatus.data;
        const jobbetSeksAvTolvSisteManederTekstId = getTekstIdForArbeidSisteManeder(svar, registreringStatus);

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
                    <OppsummeringElement sporsmalId={SporsmalId.dinSituasjon}>
                        <strong>Din Situasjon: &nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.sisteStilling}
                        tekst={state.sisteStilling.data.stilling.label}
                        skjul={state.sisteStilling.data.stilling === ingenYrkesbakgrunn}
                    >
                        <strong><FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanning}
                        skjulHvisSvarErLik={UtdanningSvar.INGEN_SVAR}
                    >
                        <strong>Utdannelse: &nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanningGodkjent}
                        skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
                    >
                        <strong>Utdannelse godkjent: &nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanningBestatt}
                        skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
                    >
                        <strong>Utdanning bestått: &nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement sporsmalId={SporsmalId.helseHinder}>
                        <strong>Helse hinder: &nbsp;</strong>
                    </OppsummeringElement>
                    <OppsummeringElement sporsmalId={SporsmalId.andreForhold}>
                        <strong>Andre forhold: &nbsp;</strong>
                    </OppsummeringElement>
                </ul>
            </div>
        );
    }

}

const mapStateToProps = (state: AppState) => ({
    state: state
});

export default connect(mapStateToProps)(
    OrdinaerOppsummeringBesvarelser
);
