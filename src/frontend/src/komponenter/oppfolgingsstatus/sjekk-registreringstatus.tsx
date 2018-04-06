import * as React from 'react';
import { connect } from 'react-redux';
import { Data as RegistreringstatusData, selectRegistreringstatus } from '../../ducks/registreringstatus';
import { AppState } from '../../reducer';
import SblRegistrering from '../../sider/oppsummering/sbl-registrering';
import { VEIENTILARBEID_URL } from '../../ducks/api';

interface Props {
    registreringstatusData: RegistreringstatusData;
    children: any; // tslint:disable-line:no-any
}

function SjekkRegistreringstatus({ registreringstatusData, children }: Props) {
    if (registreringstatusData.underOppfolging) {
        document.location.href = VEIENTILARBEID_URL;
        return null;
    } else if (!registreringstatusData.oppfyllerKrav) {
        return <SblRegistrering/>;
    } else {
        return <>{children}</>;
    }
}

const mapStateToProps = (state: AppState) => ({
    registreringstatusData: selectRegistreringstatus(state).data,
});

export default connect(mapStateToProps)(
    SjekkRegistreringstatus
);
