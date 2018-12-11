import * as _ from 'lodash';
import * as React from 'react';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';
import OppsummeringElement from './oppsummering-element';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import './ordinaer-oppsummering-besvarelser.less';
import { hentElementOppsummering } from '../skjema-registrering/skjema-sporsmalene';

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
    }

}

const mapStateToProps = (state: AppState) => ({
    state: state
});

export default connect(mapStateToProps)(
    OrdinaerOppsummeringBesvarelser
);
