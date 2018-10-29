import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import {Data as StartRegistreringData, RegistreringType } from '../../ducks/registreringstatus';
import { selectSykefravaerFeatureToggle } from '../../ducks/feature-toggles';

interface StateProps {
    visSykefravaerSkjema: boolean;
    startRegistreringStatus: StartRegistreringData;
}

type Props = InjectedIntlProps & StateProps;

class Banner extends React.Component<Props> {

    render() {

        const registreringType = this.props.startRegistreringStatus.registreringType;

        const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING
            && this.props.visSykefravaerSkjema;

        const bannerOverskriftId = visSykefravaerSkjema ?
            'banner-overskrift-sykefravaer' : 'banner-overskrift-ordinaer';

        return (!this.skalVises()) ? (null) : (
            <div className="registrering-banner">
                <Systemtittel tag="h1">
                    {this.props.intl.messages[bannerOverskriftId]}
                </Systemtittel>
            </div>
        );
    }

    skalVises(): boolean {
        return !(document.location.pathname.includes(START_PATH)
            && (this.props.startRegistreringStatus.underOppfolging === false));
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    visSykefravaerSkjema: selectSykefravaerFeatureToggle(state),
    startRegistreringStatus: state.registreringStatus.data,
});

export default connect(mapStateToProps)(injectIntl(Banner));
