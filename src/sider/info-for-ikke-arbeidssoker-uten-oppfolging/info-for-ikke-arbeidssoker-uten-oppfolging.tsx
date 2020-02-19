import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { uniLogger } from '../../metrikker/uni-logger';
import OriginalMelding from './original-melding';
import NyMelding from './ny-melding';
import './info-for-ikke-arbeidssoker-uten-oppfolging.less';
import { antallUkerSykmeldt } from '../../utils/antall-uker-sykmeldt';

interface StateProps {
    state: AppState;
}

const InfoForIkkeArbeidssokerUtenOppfolging = ({ state }: StateProps) => {
    const { formidlingsgruppe, servicegruppe, geografiskTilknytning } = state.registreringStatus.data;
    const underOppfolging = state.registreringStatus.data.underOppfolging ? 'ja' : 'nei';
    const rettighetsgruppe = state.registreringStatus.data.rettighetsgruppe;

    const maksdato = state.registreringStatus.data.maksDato;
    const ukerSykmeldt: string = maksdato ? antallUkerSykmeldt(new Date(), new Date(maksdato)).toString() : 'null';

    const nyVersjon = state.featureToggles.data['arbeidssokerregistrering.sperret.ny-versjon'];
    uniLogger('registrering.info-for-ikke-arbeidssoker-uten-oppfolging.sidevisning',
        { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, rettighetsgruppe, ukerSykmeldt });
    return nyVersjon ?
        (
            <NyMelding
                formidlingsgruppe={formidlingsgruppe || 'null'}
                servicegruppe={servicegruppe || 'null'}
                geografiskTilknytning={geografiskTilknytning || 'null'}
                underOppfolging={underOppfolging}
                ukerSykmeldt={ukerSykmeldt}
            />
        ) : (
            <OriginalMelding
                formidlingsgruppe={formidlingsgruppe}
                servicegruppe={servicegruppe}
                geografiskTilknytning={geografiskTilknytning}
                underOppfolging={underOppfolging}
                ukerSykmeldt={ukerSykmeldt}
            />
        );
};

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

export default connect(mapStateToProps)(InfoForIkkeArbeidssokerUtenOppfolging);