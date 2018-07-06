import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import { Data as StartRegistreringData } from '../../ducks/registreringstatus';

interface StateProps {
    startRegistreringStatus: StartRegistreringData;
}

type Props = InjectedIntlProps & StateProps;

class Banner extends React.Component<Props> {
    render() {
        return (!this.skalVises()) ? (null) : (
            <div className="registrering-banner">
                <Systemtittel tag="h1">
                    {this.props.intl.messages['banner-overskrift']}
                </Systemtittel>
            </div>
        );
    }

    skalVises(): boolean {
        return !(document.location.pathname.includes(START_PATH)
            && (this.props.startRegistreringStatus.underOppfolging === false)
            && (this.props.startRegistreringStatus.kreverReaktivering === false));

    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    startRegistreringStatus: state.registreringStatus.data
});

export default connect(mapStateToProps)(injectIntl(Banner));
