import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Data as StartRegistreringData, RegistreringType, ActionTypes as registringActionType }
    from '../../ducks/registreringstatus';
import { State as RegistrerBruker, ActionTypes as registrerbrukerActionType }
    from '../../ducks/registrerbruker';
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
import Lukknapp from 'nav-frontend-lukknapp';
import { MatchProps } from '../../utils/utils';

interface StateProps {
    startRegistreringStatus: StartRegistreringData;
    registrerbruker: RegistrerBruker;
}

interface OwnState {
    skalVise: boolean;
    feilmeldingRadioKnapp: string;
}

type Props = InjectedIntlProps & StateProps & RouteComponentProps<MatchProps>;

class HerokuappEndreMockRegistreringLoep extends React.Component<Props, OwnState> {

    componentWillMount() {
        this.setState({
            skalVise: false,
            feilmeldingRadioKnapp: ''
        });
    }

    render() {
        const store = getStore();
        const { registreringType } = this.props.startRegistreringStatus;
        const reset = () => {
            store.dispatch({
                type: reaktiveringActionType.REAKTIVER_BRUKER_STATUS_PENDING,
            });
            store.dispatch({
                type: svarActionType.AVGI_SVAR_INIT,
            });
            store.dispatch({
                type: registrerbrukerActionType.REG_BRUKER_STATUS_OK,
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

        const {
            skalVise,
        } = this.state;

        const visSkjul = skalVise ? 'vis' : 'skjul';
        const ApneLukkTekst = skalVise ? 'Lukk' : 'Åpne';

        return (
            <div className={`devToggleStatus ${visSkjul}`}>
                <fieldset className="devToggleStatus__fieldset">
                    <legend
                        className="devToggleStatus__legend"
                    >
                        <Normaltekst>
                            Endre registrerings løp
                        </Normaltekst>
                    </legend>
                    <div>
                        <div
                            className="apne-lukk-knapp"
                            onClick={() => {
                                this.setState({
                                    skalVise: !this.state.skalVise
                                });
                            }}
                        >
                            <div>
                                <Normaltekst>
                                    {ApneLukkTekst} Demo
                                </Normaltekst>
                            </div>
                            <Lukknapp>
                                Lukk
                            </Lukknapp>
                        </div>

                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.ORDINAER_REGISTRERING);
                            }}
                            name="registreringsType"
                            label="Arbeidssøker registrering"
                            value="Ordinar"
                            checked={registreringType === RegistreringType.ORDINAER_REGISTRERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.SYKMELDT_REGISTRERING);
                            }}
                            name="registreringsType"
                            label="Sykmeldt med arbeidsgiver > 39 uker"
                            value="Sykmeldt med arbeidsgiver > 39 uker"
                            checked={registreringType === RegistreringType.SYKMELDT_REGISTRERING}
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
    registrerbruker: state.registrerBruker,
});

export default connect(mapStateToProps)(withRouter(injectIntl(HerokuappEndreMockRegistreringLoep)));
