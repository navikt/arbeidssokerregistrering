//tslint:disable
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {AppState} from '../../reducer';
import {endreSvarAction, SporsmalId, State as SvarState} from '../../ducks/svar';
import LenkeAvbryt from '../knapper/lenke-avbryt';
import LenkeTilbake from '../knapper/lenke-tilbake';
import LenkeNeste from '../knapper/lenke-neste';
import Animasjon from '../../sider/skjema-registrering/animasjon';
import ResponsivSide from '../side/responsiv-side';
import {FormattedMessage, InjectedIntlProps, injectIntl} from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import {RouteComponentProps} from 'react-router';
import {MatchProps} from '../../utils/utils';
import {getAlleSporsmalSomIkkeSkalBesvares, isNumber, kanGaaTilNeste, SkjemaConfig} from './skjema-utils';
import {IngenSvar, Svar} from '../../ducks/svar-utils';
import {START_PATH} from "../../utils/konstanter";

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
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

const INGEN_NESTE_SPORSMAL = -1;

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class Skjema extends React.Component<Props, OwnState> {

    constructor(props: Props){
        super(props);

        this.state = {
            visAdvarsel: false
        };

        this.gaaTilStartHvisIdErUgyldig(this.props.match.params.id);
    }

    handleNesteBtnClick = (): void => {
        
        const gaaTilNeste = kanGaaTilNeste(this.props.svarState, this.hentGjeldendeSporsmalId(this.props));

        if(gaaTilNeste){
            this.settIngenSvarForUbesvarteSporsmal(this.props);
        }

        this.setState({ visAdvarsel: !gaaTilNeste });

    };

    handleTilbakeBtnClick = (): void => {
        this.setState({ visAdvarsel: false });
        this.props.history.goBack();
    };
    
    settIngenSvarForUbesvarteSporsmal = (props: Props) => {

        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering(props);
        const nesteSporsmalPlassering = this.finnNesteSporsmalPlassering(props);
        const sporsmalIder = this.getSporsmalIder(props);

        for(let i = gjeldendeSporsmalPlassering + 1; i < nesteSporsmalPlassering; i++){
            const sporsmalId = sporsmalIder[i];
            props.endreSvar(sporsmalId, IngenSvar.INGEN_SVAR);
        }
        
    };
    
    finnGjeldendeSporsmal = (): React.ReactElement<any> => {

        const plassering = this.finnGjeldendeSporsmalPlassering(this.props);

        if (!this.props.children || plassering < 0 || plassering > this.props.children.length) {
            return (<p>Spørsmålet finnes ikke</p>);
        }

        return this.props.children[plassering];
    };

    finnGjeldendeSporsmalPlassering = (props: Props): number => {
        const plassering = Number.parseInt(props.match.params.id, 10);
        return isNumber(plassering) ? plassering : -1;
    };

    finnNesteSporsmalPlassering = (props: Props): number => {

        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering(props);

        const foregaendeSporsmalIder =
            this.getSporsmalIder(props).filter((sporsmalId, indeks) => indeks <= gjeldendeSporsmalPlassering);

        const sporsmalIderSomIkkeSkalBesvares =
            getAlleSporsmalSomIkkeSkalBesvares(foregaendeSporsmalIder, props.svarState, props.config);

        const sporsmalIder = this.getSporsmalIder(props);

        for (let i = gjeldendeSporsmalPlassering + 1; i < sporsmalIder.length; i++) {

            if (!sporsmalIderSomIkkeSkalBesvares.includes(sporsmalIder[i])) {
                return i;
            }

        }

        return INGEN_NESTE_SPORSMAL;

    };

    finnNesteHref = (): string => {

        const nesteSporsmalPlassering = this.finnNesteSporsmalPlassering(this.props);

        if(nesteSporsmalPlassering === INGEN_NESTE_SPORSMAL){
            return this.props.endUrl;
        }

        return this.props.baseUrl + '/' + nesteSporsmalPlassering;

    };

    hentGjeldendeSporsmalId = (props: Props): SporsmalId => {
        const sporsmalIder = this.getSporsmalIder(props);
        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering(props);
        return sporsmalIder[gjeldendeSporsmalPlassering];
    };

    getSporsmalIder = (props: Props): SporsmalId[] => {
        return props.children.map(child => child.props.sporsmalId);
    };

    gaaTilStartHvisIdErUgyldig(idStr: string) {

        const id = parseInt(idStr, 10);
        const antallSporsmal = this.getSporsmalIder(this.props).length;

        if (!isNumber(id) || id < 0 || id >= antallSporsmal){
            this.props.history.push(START_PATH);
        }

    }

    shouldComponentUpdate(nextProps: Props): boolean {

        if(this.state.visAdvarsel){
            const visAdvarsel: boolean = !kanGaaTilNeste(nextProps.svarState, this.hentGjeldendeSporsmalId(nextProps));
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

        const nesteHref = this.finnNesteHref();

        const gjeldendeSporsmal = this.finnGjeldendeSporsmal();

        const kanGaaTilNesteTmp = kanGaaTilNeste(this.props.svarState, this.hentGjeldendeSporsmalId(this.props));

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
                    <LenkeAvbryt/>
                </Animasjon>
            </ResponsivSide>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Skjema));
