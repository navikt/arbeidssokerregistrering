import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { AppState } from '../../reducer';
import { endreSvarAction, setInitialState, SporsmalId, State as SvarState } from '../../ducks/svar';
import LenkeAvbryt from '../knapper/lenke-avbryt';
import LenkeTilbake from '../knapper/lenke-tilbake';
import LenkeNeste from '../knapper/lenke-neste';
import Animasjon from '../../sider/skjema-registrering/animasjon';
import ResponsivSide from '../side/responsiv-side';
import { MatchProps } from '../../utils/utils';
import {
    erSporsmalBesvart,
    finnGjeldendeSporsmalPlassering,
    finnNesteHref,
    finnNesteSporsmalPlassering,
    getSporsmalIder,
    hentGjeldendeSporsmalId,
    isNumber,
    kanGaaTilNeste,
    SkjemaConfig
} from './skjema-utils';
import { hentSvar, IngenSvar, Svar } from '../../ducks/svar-utils';
import { START_PATH } from '../../utils/konstanter';
import {
    Data as RegistreringstatusData,
    RegistreringType,
    selectRegistreringstatus
} from '../../ducks/registreringstatus';

import './skjema.less';

interface StateProps {
    svarState: SvarState;
    registreringstatusData: RegistreringstatusData;
}

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
    resetSvar: () => void;
}

interface OwnState {
    visAdvarsel: boolean;
}

interface OwnProps {
    children: React.ReactElement<{sporsmalId: SporsmalId}>[];
    config: SkjemaConfig;
    baseUrl: string;
    endUrl: string;
}

export type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class Skjema extends React.Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            visAdvarsel: false,
        };

        this.gaaTilStartHvisIdErUgyldig(this.props.match.params.id);
        this.gaaTilStartHvisForegaendeSporsmalIkkeBesvart();
    }

    handleNesteBtnClick = (): void => {
        const gaaTilNeste = kanGaaTilNeste(this.props.svarState, hentGjeldendeSporsmalId(this.props));

        if (gaaTilNeste) {
            this.settIngenSvarForUbesvarteSporsmal();
        }
        this.setState({ visAdvarsel: !gaaTilNeste });
    }

    handleTilbakeBtnClick = (): void => {
        this.setState({ visAdvarsel: false });
        this.props.history.goBack();
    }

    settIngenSvarForUbesvarteSporsmal = () => {
        const gjeldendeSporsmalPlassering = finnGjeldendeSporsmalPlassering(this.props);
        const nesteSporsmalPlassering = finnNesteSporsmalPlassering(this.props);
        const sporsmalIder = getSporsmalIder(this.props);

        for (let i = gjeldendeSporsmalPlassering + 1; i < nesteSporsmalPlassering; i++) {
            const sporsmalId = sporsmalIder[i];
            this.props.endreSvar(sporsmalId, IngenSvar.INGEN_SVAR);
        }
    }

    finnGjeldendeSporsmal = (): React.ReactChild => {
        const plassering = finnGjeldendeSporsmalPlassering(this.props);

        if (!this.props.children || plassering < 0 || plassering > this.props.children.length) {
            return (<p>Spørsmålet finnes ikke</p>);
        }
        return this.props.children[plassering];
    }

    gaaTilStartHvisIdErUgyldig = (idStr: string): void => {
        const id = parseInt(idStr, 10);
        const antallSporsmal = getSporsmalIder(this.props).length;

        if (!isNumber(id) || id < 0 || id >= antallSporsmal) {
            this.props.history.push(START_PATH);
        }
    }

    gaaTilStartHvisForegaendeSporsmalIkkeBesvart = (): void => {
        const registreringType = this.props.registreringstatusData.registreringType;
        const gjeldendeSporsmalPlassering = finnGjeldendeSporsmalPlassering(this.props);
        const sporsmalIder = getSporsmalIder(this.props);
        const horerTilSykefravaerLop = registreringType === RegistreringType.SYKMELDT_REGISTRERING;

        /*
        Sykefraværløpet har et inngangsspørsmål som ikke er en del av skjemaet.
        Dette vil sende brukere til riktig sted hvis de refresher siden på det
        første spørsmålet etter inngangsspørsmålet.
        */
        if (horerTilSykefravaerLop &&
            !erSporsmalBesvart(this.props.svarState, SporsmalId.fremtidigSituasjon)) {
            this.props.history.push(START_PATH);
            return;
        }

        for (let i = 0; i < gjeldendeSporsmalPlassering; i++) {

            if (!hentSvar(this.props.svarState, sporsmalIder[i])) {
                this.props.history.push(START_PATH);
                return;
            }
        }
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        if (this.state.visAdvarsel) {
            const visAdvarsel: boolean = !kanGaaTilNeste(nextProps.svarState, hentGjeldendeSporsmalId(nextProps));
            if (!visAdvarsel) {
                this.setState({ visAdvarsel: false });
                return false;
            }
        }
        return true;
    }

    render() {
        const advarselElement = this.state.visAdvarsel ? (
            <NavAlertStripe type="advarsel" className="spm-advarsel">
                <FormattedMessage id="skjema.alternativ.advarsel.tekst"/>
            </NavAlertStripe>) : null;

        const nesteHref = finnNesteHref(this.props);
        const gjeldendeSporsmal = this.finnGjeldendeSporsmal();
        const kanGaaTilNesteTmp = kanGaaTilNeste(this.props.svarState, hentGjeldendeSporsmalId(this.props));

        return (
            <ResponsivSide> {/* TODO FO-1547 Sleng på IE-classnames? */}
                {gjeldendeSporsmal}
                {advarselElement}
                <Animasjon flag={this.props.match.params.id}>
                    <LenkeNeste
                        onClick={this.handleNesteBtnClick}
                        href={nesteHref}
                        erAktiv={kanGaaTilNesteTmp}
                    />
                    <LenkeTilbake
                        onClick={this.handleTilbakeBtnClick}
                    />
                    <LenkeAvbryt />
                </Animasjon>
            </ResponsivSide>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
    registreringstatusData: selectRegistreringstatus(state).data,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
    resetSvar: () => dispatch(setInitialState())
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Skjema));
