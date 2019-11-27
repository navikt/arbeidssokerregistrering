import * as React from 'react';
import { connect } from 'react-redux';
import { Systemtittel } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import { AppState } from '../../reducer';
import { uniLogger } from '../../metrikker/uni-logger';
import NyMelding from './nyere-melding'
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import './info-for-ikke-arbeidssoker-uten-oppfolging.less';

interface StateProps {
    state: AppState;
}

const InfoForIkkeArbeidssokerUtenOppfolging = ({ state } : StateProps) => {
    const formidlingsgruppe = state.registreringStatus.data.formidlingsgruppe;
    const servicegruppe = state.registreringStatus.data.servicegruppe;
    const geografiskTilknytning = state.registreringStatus.data.geografiskTilknytning;
    const underOppfolging = state.registreringStatus.data.underOppfolging ? 'ja' : 'nei';
    uniLogger('registrering.info-for-ikke-arbeidssoker-uten-oppfolging.sidevisning', { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging })
    return (
        <div>
            <div className="registrering-banner">
                <Systemtittel tag="h1">
                    Registrering
                </Systemtittel>
            </div>
            <GraaBakgrunn />
            <Row className="">
                <Column xs="12">
                <div className="info-for-ikke-arbeidssoker">
                    <NyMelding formidlingsgruppe={ formidlingsgruppe } servicegruppe={ servicegruppe } geografiskTilknytning={ geografiskTilknytning } underOppfolging={ underOppfolging } />
                </div>
                </Column>
            </Row>
        </div>
        
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

export default connect(mapStateToProps)(InfoForIkkeArbeidssokerUtenOppfolging);