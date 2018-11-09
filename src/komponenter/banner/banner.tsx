import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import {Data as StartRegistreringData, RegistreringType } from '../../ducks/registreringstatus';
import { RouteComponentProps, withRouter } from 'react-router';
import { MatchProps } from '../../utils/utils';

import './banner.less';

interface StateProps {
    startRegistreringStatus: StartRegistreringData;
}

type Props = RouteComponentProps<MatchProps> & InjectedIntlProps & StateProps;

class Banner extends React.Component<Props> {

    render() {

        const registreringType = this.props.startRegistreringStatus.registreringType;

        const visSykefravaerSkjema = registreringType === RegistreringType.SYKMELDT_REGISTRERING;

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
        const pathname = this.props.location.pathname.toString();
        return !(pathname.includes(START_PATH)
            && (this.props.startRegistreringStatus.underOppfolging === false));
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    startRegistreringStatus: state.registreringStatus.data,
});

export default connect(mapStateToProps)(withRouter(injectIntl(Banner)));
