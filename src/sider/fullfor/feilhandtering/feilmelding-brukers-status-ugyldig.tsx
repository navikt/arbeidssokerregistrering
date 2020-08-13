import * as React from 'react';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../../../reducer';
import Feilmelding from '../../../komponenter/feilmelding/feilmelding';
import { ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../../ducks/feature-toggles';
import { uniLogger } from '../../../metrikker/uni-logger';
import './feilmelding-brukers-status-ugyldig.less';
import OppholdsTillatelseKontaktMeg from '../../../komponenter/oppholdstillatelse/KontaktMegController';
import KontaktMeg from '../../../komponenter/utvandret/kontakt-meg';
import { withTranslation, WithTranslation } from 'react-i18next'

interface FeilmeldingBrukersStatusUgyldigProps {
    feilType: FullforErrorTypes;
}

interface StateProps {
    featureToggles: FeatureToggleData;
    state: AppState;
}

type AllProps = StateProps & FeilmeldingBrukersStatusUgyldigProps & WithTranslation;

class FeilmeldingBrukersStatusUgyldig extends React.Component<AllProps> {

    lagFeilmelding(feilType: FullforErrorTypes, toggleUtvandret: boolean) {

        const { t } = this.props;
        let feilmelding;

        if (feilType === FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
            feilmelding = <OppholdsTillatelseKontaktMeg />;
        } else if (feilType === FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET && toggleUtvandret) {
            feilmelding = <KontaktMeg />;
        } else {

            let messageKey;

            if (feilType === FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
                messageKey = 'feilhandtering-utvandret-overtekst';
            } else {
                messageKey = 'feilhandtering-overtekst';
            }

            feilmelding = (
                <Feilmelding>
                    <div>
                        <Normaltekst className="blokk-s">
                            {t(messageKey)}
                        </Normaltekst>
                        <Normaltekst>
                            <span dangerouslySetInnerHTML={{ __html: t('feilhandtering-undertekst') }} />
                        </Normaltekst>
                    </div>
                </Feilmelding>
            );

        }

        return feilmelding;
    }

    render() {
        const { feilType, featureToggles, state } = this.props;
        const geografiskTilknytning = state.registreringStatus.data ?
            state.registreringStatus.data.geografiskTilknytning || 'INGEN_VERDI' :
            'INGEN_DATA';
        const featureUtvandretKontakt = featureToggles['arbeidssokerregistrering.utvandret.kontakt-bruker'];
        const feilmelding = this.lagFeilmelding(feilType, featureUtvandretKontakt);
        uniLogger('arbeidssokerregistrering.error', { feilType: feilType, geografiskTilknytning });

        return (
            <div className="feilhandtering">
                {feilmelding}
            </div>
        );

    }
}

const mapStateToProps = (state: AppState) => ({
    featureToggles: selectFeatureToggles(state),
    state: state,
});

export default connect(mapStateToProps)(withTranslation()(FeilmeldingBrukersStatusUgyldig));
