import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Route, RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Data as StartRegistreringData, RegistreringType, Servicegruppe, Formidlingsgruppe, ActionTypes as registringActionType }
    from '../../ducks/registreringstatus';
import { State as RegistrerBruker, ActionTypes as registrerbrukerActionType }
    from '../../ducks/registrerbruker';
import { ActionTypes as reaktiveringActionType }
    from '../../ducks/reaktiverbruker';
import { ActionTypes as SvarActionTypes, ActionTypes as svarActionType, SporsmalId }
    from '../../ducks/svar';
import { RadioPanel } from 'nav-frontend-skjema';
import { getStore } from '../../store';
import { Normaltekst } from 'nav-frontend-typografi';
import { AppState } from '../../reducer';
import './herokuapp-endre-mock-registrering-loep.less';
import startRegistreringStatus from '../registreringstatus-mock';
import Lukknapp from 'nav-frontend-lukknapp';
import { ordinaerRegistreringFeilrespons } from '../registrerbruker-mock';
import { MatchProps } from '../../utils/utils';
import { ActionTypes as SisteStillingActionTypes, annenStilling } from '../../ducks/siste-stilling';
import { IngenSvar } from '../../ducks/svar-utils';

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
            skalVise: true,
            feilmeldingRadioKnapp: ''
        });
    }

    dispathSpmOgPush = (store: any, history: any) => { // tslint:disable-line

        store.dispatch({
            type: SisteStillingActionTypes.ENDRE_SISTE_STILLING,
            data: { stilling: annenStilling }
        });

        [
            SporsmalId.dinSituasjon,
            SporsmalId.sisteStilling,
            SporsmalId.utdanning,
            SporsmalId.utdanningGodkjent,
            SporsmalId.utdanningBestatt,
            SporsmalId.helseHinder,
            SporsmalId.andreForhold,
        ].forEach(sporsmalId => store.dispatch({
            type: SvarActionTypes.AVGI_SVAR,
            data: {
                sporsmalId,
                svar: IngenSvar.INGEN_SVAR,
            }
        }));

        history.push('/fullfor');
    }

    render() {
        const store = getStore();
        const { registreringType, servicegruppe, formidlingsgruppe, underOppfolging, maksDato, geografiskTilknytning } = this.props.startRegistreringStatus;
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
                    formidlingsgruppe: formidlingsgruppe,
                    servicegruppe,
                    geografiskTilknytning
                }
            });
            reset();
        };

        const oppdaterServicegruppe = (type: Servicegruppe) => {
            store.dispatch({
                type: registringActionType.HENT_REG_STATUS_OK,
                data: {
                    registreringType,
                    servicegruppe: type,
                    underOppfolging,
                    maksDato,
                    formidlingsgruppe,
                    geografiskTilknytning
                }
            });
            reset();
        };

        const oppdaterFormidlingsgruppe = (type: Formidlingsgruppe) => {
            store.dispatch({
                type: registringActionType.HENT_REG_STATUS_OK,
                data: {
                    registreringType,
                    servicegruppe,
                    underOppfolging,
                    maksDato,
                    formidlingsgruppe: type,
                    geografiskTilknytning
                }
            });
            reset();
        };

        const oppdaterGeografiskTilknytning = (type: string) => {
            store.dispatch({
                type: registringActionType.HENT_REG_STATUS_OK,
                data: {
                    registreringType,
                    servicegruppe,
                    underOppfolging,
                    maksDato,
                    formidlingsgruppe,
                    geografiskTilknytning: type
                }
            });
            reset();
        };

        const {
            skalVise,
            feilmeldingRadioKnapp
        } = this.state;

        const visSkjul = skalVise ? 'vis' : 'skjul';
        const ApneLukkTekst = skalVise ? 'Start' : 'Åpne';

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
                            name="devToggleStatus"
                            label="Arbeidssøker registrering"
                            value="Ordinar"
                            checked={registreringType === RegistreringType.ORDINAER_REGISTRERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.SYKMELDT_REGISTRERING);
                            }}
                            name="devToggleStatus"
                            label="Sykmeldt med arbeidsgiver 39 uker til 52 uker"
                            value="Sykmeldt med arbeidsgiver 39 uker til 52 uker"
                            checked={registreringType === RegistreringType.SYKMELDT_REGISTRERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.REAKTIVERING);
                            }}
                            name="devToggleStatus"
                            label="Enkel reaktivering"
                            value="Sykmeldt"
                            checked={registreringType === RegistreringType.REAKTIVERING}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.SPERRET);
                            }}
                            name="devToggleStatus"
                            label="Sykmeldt med arbeidsgiver mindre enn 39 uker"
                            value="Sykmeldt med arbeidsgiver mindre enn 39 uker"
                            checked={registreringType === RegistreringType.SPERRET}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterRegistreringsType(RegistreringType.ALLEREDE_REGISTRERT);
                            }}
                            name="devToggleStatus"
                            label="Sykmeldt uten arbeidsgiver/ Arbeidssoker allerede registrert"
                            value="Sykmeldt"
                            checked={registreringType === RegistreringType.ALLEREDE_REGISTRERT}
                        />
                    </div>
                </fieldset>

                <fieldset className="devToggleStatus__fieldset">
                    <legend
                        className="devToggleStatus__legend"
                    >
                        <Normaltekst>
                            Endre geografisk tilknytning
                        </Normaltekst>
                    </legend>
                    <div>
                        <RadioPanel
                            onChange={() => {
                                oppdaterGeografiskTilknytning('030102');
                            }}
                            name="devToggleStatusGeografiskTilknytning"
                            label="Grünerløkka"
                            value="030102"
                            checked={geografiskTilknytning === '030102'}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterGeografiskTilknytning('0807');
                            }}
                            name="devToggleStatusGeografiskTilknytning"
                            label="Notodden"
                            value="0807"
                            checked={geografiskTilknytning === '0807'}
                        />
                    </div>
                </fieldset>

                <fieldset className="devToggleStatus__fieldset">
                    <legend
                        className="devToggleStatus__legend"
                    >
                        <Normaltekst>
                            Endre formidlingsgruppe
                        </Normaltekst>
                    </legend>
                    <div>
                        <RadioPanel
                            onChange={() => {
                                oppdaterFormidlingsgruppe(Formidlingsgruppe.ARBS);
                            }}
                            name="devToggleStatusFormidlingsgruppe"
                            label="Formidlingsgruppe - ARBS"
                            value="ARBS"
                            checked={formidlingsgruppe === Formidlingsgruppe.ARBS}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterFormidlingsgruppe(Formidlingsgruppe.IARBS);
                            }}
                            name="devToggleStatusFormidlingsgruppe"
                            label="Formidlingsgruppe - IARBS"
                            value="IARBS"
                            checked={formidlingsgruppe === Formidlingsgruppe.IARBS}
                        />
                        <RadioPanel
                            onChange={() => {
                                oppdaterFormidlingsgruppe(Formidlingsgruppe.ISERV);
                            }}
                            name="devToggleStatusFormidlingsgruppe"
                            label="Formidlingsgruppe - ISERV"
                            value="ISERV"
                            checked={formidlingsgruppe === Formidlingsgruppe.ISERV}
                        />
                    </div>
                </fieldset>

                <fieldset className="devToggleStatus__fieldset">
                    <legend
                        className="devToggleStatus__legend"
                    >
                        <Normaltekst>
                            Endre servicegruppe
                        </Normaltekst>
                    </legend>
                    <div>
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.BATT);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - BATT"
                                value="BATT"
                                checked={servicegruppe === Servicegruppe.BATT}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.BFORM);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - BFORM"
                                value="BFORM"
                                checked={servicegruppe === Servicegruppe.BFORM}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.BKART);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - BKART"
                                value="BKART"
                                checked={servicegruppe === Servicegruppe.BKART}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.IKVAL);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - IKVAL"
                                value="IKVAL"
                                checked={servicegruppe === Servicegruppe.IKVAL}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.IVURD);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - IVURD"
                                value="IVURD"
                                checked={servicegruppe === Servicegruppe.IVURD}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.OPPFI);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - OPPFI"
                                value="OPPFI"
                                checked={servicegruppe === Servicegruppe.OPPFI}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.VARIG);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - VARIG"
                                value="VARIG"
                                checked={servicegruppe === Servicegruppe.VARIG}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.VURDI);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - VURDI"
                                value="VURDI"
                                checked={servicegruppe === Servicegruppe.VURDI}
                        />
                        <RadioPanel
                                onChange={() => {
                                    oppdaterServicegruppe(Servicegruppe.VURDU);
                                }}
                                name="devToggleStatusServicegruppe"
                                label="Servicegruppe - VURDU"
                                value="VURDU"
                                checked={servicegruppe === Servicegruppe.VURDU}
                        />
                    </div>
                </fieldset>

                <fieldset className="devToggleStatus__fieldset-feilmelding">
                    <legend
                        className="devToggleStatus__legend"
                    >
                        <Normaltekst>
                            Feilmeldinger
                        </Normaltekst>
                    </legend>
                    <div>
                        <RadioPanel
                            onChange={() => {

                                oppdaterRegistreringsType(RegistreringType.ORDINAER_REGISTRERING);

                                store.dispatch({
                                    type: registrerbrukerActionType.REG_BRUKER_STATUS_FEILET
                                });

                                this.dispathSpmOgPush(store, this.props.history);

                                this.setState({
                                    feilmeldingRadioKnapp: 'generelt'
                                });

                            }}
                            name="feilmelding"
                            label="Feilmelding - generell kontakt brukerstøtte"
                            value="Feilmelding - generell kontakt brukerstøtte"
                            checked={
                                feilmeldingRadioKnapp === 'generelt'
                            }
                        />
                        <RadioPanel
                            onChange={() => {

                                oppdaterRegistreringsType(RegistreringType.ORDINAER_REGISTRERING);

                                store.dispatch({
                                    type: registrerbrukerActionType.REG_BRUKER_STATUS_FEILET,
                                    data: {
                                        data: ordinaerRegistreringFeilrespons,
                                        response: new Response(new Blob(), {status: 500})
                                    }
                                });

                                this.dispathSpmOgPush(store, this.props.history);

                                this.setState({
                                    feilmeldingRadioKnapp: 'manglerarbtillatelse'
                                });

                            }}
                            name="feilmelding"
                            label="Feilmelding - brukere mangler arbeidsstillatelse"
                            value="Feilmelding - brukere mangler arbeidsstillatelse"
                            checked={
                                feilmeldingRadioKnapp === 'manglerarbtillatelse'
                            }
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

const HerokuMock = connect(mapStateToProps)(withRouter(injectIntl(HerokuappEndreMockRegistreringLoep)));

export const RouteHerokuMock =
    !!process.env.REACT_APP_MOCK_ENDRE_REG_LOP
        ? <Route path="/" component={HerokuMock}/>
        : null;
