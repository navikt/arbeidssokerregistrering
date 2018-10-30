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
            <div className="oppsummering-besvarelser">
                <img
                    src={oppsummeringSvg}
                    alt="Oppsummering sjekkliste"
                    className="oppsummering-besvarelser__illustrasjon"
                />
                <ul className="oppsummering-besvarelser__list">
                    <OppsummeringElement
                        tekstId={jobbetSeksAvTolvSisteManederTekstId}
                        skjul={jobbetSeksAvTolvSisteManederTekstId === ''}
                    />
                    <OppsummeringElement sporsmalId={SporsmalId.dinSituasjon}>
                        <FormattedMessage id={`oppsummering-dinsituasjon`}/>&nbsp;
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.sisteStilling}
                        tekst={state.sisteStilling.data.stilling.label}
                        skjul={state.sisteStilling.data.stilling === ingenYrkesbakgrunn}
                    >
                        <FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanning}
                        skjulHvisSvarErLik={UtdanningSvar.INGEN_SVAR}
                    >
                        <FormattedMessage id="oppsummering-utdanning-fortekst"/>&nbsp;
                    </OppsummeringElement>
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanningBestatt}
                        skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
                    />
                    <OppsummeringElement
                        sporsmalId={SporsmalId.utdanningGodkjent}
                        skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
                    />
                    <OppsummeringElement sporsmalId={SporsmalId.helseHinder}/>
                    <OppsummeringElement sporsmalId={SporsmalId.andreForhold}/>
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
