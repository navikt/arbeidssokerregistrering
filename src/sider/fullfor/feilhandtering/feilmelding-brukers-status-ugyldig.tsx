import * as React from 'react';
import { InjectedIntlProps, InjectedIntl, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../../../reducer';
import Feilmelding from '../../../komponenter/feilmelding/feilmelding';
import { ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../../ducks/feature-toggles';
import { uniLogger } from '../../../metrikker/uni-logger';
import './feilmelding-brukers-status-ugyldig.less';
import FeilmeldingManglerArbeidstillatelse
    from '../../../komponenter/feilmelding/feilmelding-mangler-arbeidstillatelse';
import OppholdsTillatelseKontaktMeg
    from '../../../komponenter/oppholdstillatelse/KontaktMegController'

interface FeilmeldingBrukersStatusUgyldigProps {
    feilType: FullforErrorTypes;
}

interface StateProps {
    featureToggles: FeatureToggleData;
    state: AppState;
}

type AllProps = StateProps & InjectedIntlProps & FeilmeldingBrukersStatusUgyldigProps;

class FeilmeldingBrukersStatusUgyldig extends React.Component<AllProps> {

    lagFeilmelding(feilType: FullforErrorTypes, intl: InjectedIntl, toggleOppholdstillatelse: boolean) {

        const { messages } = intl;
        let feilmelding;

        if (feilType === FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
            feilmelding = toggleOppholdstillatelse ? <OppholdsTillatelseKontaktMeg /> : <FeilmeldingManglerArbeidstillatelse intl={this.props.intl} />;
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
                            {messages[messageKey]}
                        </Normaltekst>
                        <Normaltekst>
                            <span dangerouslySetInnerHTML={{ __html: messages['feilhandtering-undertekst'] }} />
                        </Normaltekst>
                    </div>
                </Feilmelding>
            );

        }

        return feilmelding;
    }

    render() {
        const { feilType, intl, featureToggles } = this.props;
        const featureOppholdstillatelseKontakt = featureToggles['arbeidssokerregistrering.oppholdstillatelse.kontakt-bruker'];
        const feilmelding = this.lagFeilmelding(feilType, intl, featureOppholdstillatelseKontakt);
        uniLogger('arbeidssokerregistrering.error', { feilType: feilType });

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

export default connect(mapStateToProps)(injectIntl(FeilmeldingBrukersStatusUgyldig));
