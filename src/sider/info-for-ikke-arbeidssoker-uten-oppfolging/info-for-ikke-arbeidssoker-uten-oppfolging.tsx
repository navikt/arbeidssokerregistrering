import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { uniLogger } from '../../metrikker/uni-logger';
import OriginalMelding from './original-melding';
import NyMelding from './ny-melding';
import './info-for-ikke-arbeidssoker-uten-oppfolging.less';

interface StateProps {
    state: AppState;
}

const InfoForIkkeArbeidssokerUtenOppfolging = ({ state } : StateProps) => {
    const { formidlingsgruppe, servicegruppe, geografiskTilknytning } = state.registreringStatus.data
    const underOppfolging = state.registreringStatus.data.underOppfolging ? 'ja' : 'nei';
    const rettighetsgruppe = state.registreringStatus.data.rettighetsgruppe;
    const maksdato = state.registreringStatus.data.maksDato || 'null';
    const nyVersjon = state.featureToggles.data["arbeidssokerregistrering.sperret.ny-versjon"]
    uniLogger('registrering.info-for-ikke-arbeidssoker-uten-oppfolging.sidevisning', { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, rettighetsgruppe, maksdato })
    const melding = nyVersjon ? <NyMelding formidlingsgruppe={formidlingsgruppe} servicegruppe={servicegruppe} geografiskTilknytning={geografiskTilknytning} underOppfolging={underOppfolging} /> : <OriginalMelding formidlingsgruppe={formidlingsgruppe} servicegruppe={servicegruppe} geografiskTilknytning={geografiskTilknytning} underOppfolging={underOppfolging} />
    return melding;
}

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

export default connect(mapStateToProps)(InfoForIkkeArbeidssokerUtenOppfolging);