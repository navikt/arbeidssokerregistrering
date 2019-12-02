import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { AppState } from '../../reducer';
import { uniLogger } from '../../metrikker/uni-logger';

import utropstegnSvg from '../fullfor/utropstegn.svg';
import './info-for-ikke-arbeidssoker-uten-oppfolging.less';

interface StateProps {
    state: AppState;
}

const InfoForIkkeArbeidssokerUtenOppfolging = ({ state } : StateProps) => {
    const { formidlingsgruppe, servicegruppe, geografiskTilknytning } = state.registreringStatus.data
    const underOppfolging = state.registreringStatus.data.underOppfolging ? 'ja' : 'nei';
    const rettighetsgruppe = state.registreringStatus.data.rettighetsgruppe;
    uniLogger('registrering.info-for-ikke-arbeidssoker-uten-oppfolging.sidevisning', { formidlingsgruppe, servicegruppe, geografiskTilknytning, underOppfolging, rettighetsgruppe })
    return (
        <div className="info-for-ikke-arbeidssoker">
            <Veilederpanel
                type="plakat"
                svg={<img
                    src={utropstegnSvg}
                    alt="Informasjon"
                    className="nav-veilederpanel__illustrasjon"
                />}
                kompakt={true}
            >
                <Normaltekst>
                    <FormattedMessage id="info-for-ikke-arbeidssoker-uten-oppfolging-innhold"/>
                </Normaltekst>
            </Veilederpanel>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    state
});

export default connect(mapStateToProps)(InfoForIkkeArbeidssokerUtenOppfolging);