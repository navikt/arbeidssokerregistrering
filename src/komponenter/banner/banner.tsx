import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { START_PATH } from '../../utils/konstanter';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { AppState } from '../../reducer';
import { connect } from 'react-redux';
import {Data as StartRegistreringData } from '../../ducks/registreringstatus';
import { selectSporsmalLop, SporsmalLop } from '../../ducks/sporsmal-lop';

interface StateProps {
    startRegistreringStatus: StartRegistreringData;
    sporsmalLop: SporsmalLop;
}

type Props = InjectedIntlProps & StateProps;

class Banner extends React.Component<Props> {

    render() {

        const brukerSykefravaerLop = this.props.sporsmalLop === SporsmalLop.SYKEFRAVAER_REGISTRERING;
        const bannerOverskriftId = brukerSykefravaerLop ?
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
    startRegistreringStatus: state.registreringStatus.data,
    sporsmalLop: selectSporsmalLop(state)
});

export default connect(mapStateToProps)(injectIntl(Banner));
