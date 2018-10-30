import * as _ from 'lodash';
import * as React from 'react';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import OppsummeringElement from './oppsummering-element';
import { SporsmalId } from '../../ducks/svar';
import { ingenYrkesbakgrunn, tomStilling } from '../../ducks/siste-stilling';
import { FormattedMessage } from 'react-intl';
import { UtdanningBestattSvar, UtdanningGodkjentSvar, UtdanningSvar } from '../../ducks/svar-utils';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    state: AppState;
}

class SykmeldtOppsummeringBesvarelser extends React.Component<StateProps> {

    render() {
        const { state } = this.props;
        const svar = state.svar;

        if (_.isEmpty(svar)) {
            return null;
        }

        // const registreringStatus = state.registreringStatus.data;
        // const jobbetSeksAvTolvSisteManederTekstId = getTekstIdForArbeidSisteManeder(svar, registreringStatus);

        // TODO: Hent dette fra digisyfo
        const sykemeldtSidenDato = '01.01.70';

        const skjulSisteStilling = state.sisteStilling.data.stilling === ingenYrkesbakgrunn ||
            state.sisteStilling.data.stilling === tomStilling;

        return (
            <div className="oppsummering-besvarelser">
                <img
                    src={oppsummeringSvg}
                    alt="Oppsummering sjekkliste"
                    className="oppsummering-besvarelser__illustrasjon"
                />
                <ul className="oppsummering-besvarelser__list">

                    <OppsummeringElement
                        tekstId="sykmeldt-oppsummering-sykmeldt-siden"
                        values={{ dato: sykemeldtSidenDato }}
                    />

                    <OppsummeringElement
                        sporsmalId={SporsmalId.sisteStilling}
                        tekst={state.sisteStilling.data.stilling.label}
                        skjul={skjulSisteStilling}
                    >
                        <FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;
                    </OppsummeringElement>

                    <OppsummeringElement
                        sporsmalId={SporsmalId.fremtidigSituasjon}
                    />

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
    SykmeldtOppsummeringBesvarelser
);
