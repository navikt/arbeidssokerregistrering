import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Data as StartRegistreringData, RegistreringType, ActionTypes as registringActionType }
from '../../ducks/registreringstatus';
import { ActionTypes as reaktiveringActionType }
from '../../ducks/reaktiverbruker';
import { ActionTypes as svarActionType }
from '../../ducks/svar';
import { RadioPanel } from 'nav-frontend-skjema';
import getStore from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../../reducer';
import './herokuapp-endre-mock-registrering-loep.less';
import startRegistreringStatus from '../registreringstatus-mock';

interface StateProps {
    startRegistreringStatus: StartRegistreringData;
}

type Props = InjectedIntlProps & StateProps;

class HerokuappEndreMockRegistreringLoep extends React.Component<Props> {

    render() {
        const store = getStore();
        const { registreringType } = this.props.startRegistreringStatus;
        const reset = () => {
            store.dispatch({
                type: reaktiveringActionType.REAKTIVER_BRUKER_STATUS_PENDING,
            });
            store.dispatch({
                type: svarActionType.AVGI_SVAR_RESET,
            });
        };
        const oppdaterRegistreringsType = (type: RegistreringType) => {
            store.dispatch({
                type: registringActionType.HENT_REG_STATUS_OK,
                data: {
                    registreringType: type,
                    underOppfolging: startRegistreringStatus.underOppfolging,
                    maksDato: startRegistreringStatus.maksDato,
                }
            });
            reset();
        };

        return (
            <div className="devToggleStatus">
                <fieldset className="devToggleStatus__fieldset">
                    <legend className="devToggleStatus__legend">
                        <Normaltekst>
                            Endre registrerings løp
                        </Normaltekst>
                    </legend>
                    <div>
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.ORDINAER_REGISTRERING);
                            }}
                            name="registreringsType"
                            label="Arbeidssøker registrering"
                            value="Sykmeldt"
                            checked={registreringType === RegistreringType.ORDINAER_REGISTRERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.REAKTIVERING);
                            }}
                            name="registreringsType"
                            label="Enkel reaktivering"
                            value="Sykmeldt"
                            checked={registreringType === RegistreringType.REAKTIVERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.SPERRET);
                            }}
                            name="registreringsType"
                            label="Sykmeldt med arbeidsgiver < 39 uker"
                            value="Sykmeldt med arbeidsgiver < 39 uker"
                            checked={registreringType === RegistreringType.SPERRET}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.SYKMELDT_REGISTRERING);
                            }}
                            name="registreringsType"
                            label="Sykmeldt med arbeidsgiver > 39 uker"
                            value="Sykmeldt med arbeidsgiver > 39 uker"
                            checked={registreringType === RegistreringType.SYKMELDT_REGISTRERING}
                        /><RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.ALLEREDE_REGISTRERT);
                            }}
                            name="registreringsType"
                            label="Sykmeldt uten arbeidsgiver/ Arbeidssoker allerede registrert"
                            value="Sykmeldt"
                            checked={registreringType === RegistreringType.ALLEREDE_REGISTRERT}
                        />
                    </div>
                </fieldset>
            </div>

        );
    }
}
const mapStateToProps = (state: AppState): StateProps => ({
    startRegistreringStatus: state.registreringStatus.data,
});

export default connect(mapStateToProps)(injectIntl(HerokuappEndreMockRegistreringLoep));