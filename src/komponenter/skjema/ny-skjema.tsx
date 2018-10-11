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
import { Svar} from '../../ducks/svar-utils';

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
}

type Props = OwnProps & StateProps & DispatchProps & InjectedIntlProps & RouteComponentProps<MatchProps>;

class NySkjema extends React.Component<Props, OwnState> {

    constructor(props: Props){
        super(props);

        this.state = {
            visAdvarsel: false
        }
    }

    handleNesteBtnClick = (): void => {
        this.setState({ visAdvarsel: !kanGaaTilNeste(this.props.svarState, this.hentGjeldendeSporsmalId(this.props))});
    };

    handleTilbakeBtnClick = (): void => {
        this.setState({ visAdvarsel: false });
        this.props.history.goBack();
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

    finnNesteHref = (): string => {

        const props = this.props;

        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering(props);

        const foregaendeSporsmalIder =
            this.getSporsmalIder(props).filter((sporsmalId, indeks) => indeks <= gjeldendeSporsmalPlassering);

        const sporsmalIderSomIkkeSkalBesvares =
            getAlleSporsmalSomIkkeSkalBesvares(foregaendeSporsmalIder, props.svarState, props.config);

        const sporsmalIder = this.getSporsmalIder(props);

        for (let i = gjeldendeSporsmalPlassering + 1; i < sporsmalIder.length; i++) {

            if (!sporsmalIderSomIkkeSkalBesvares.includes(sporsmalIder[i])) {
                return props.baseUrl + '/' + i;
            }

        }

        return props.baseUrl + '/oppsummering';

    };

    hentGjeldendeSporsmalId = (props: Props): SporsmalId => {
        const sporsmalIder = this.getSporsmalIder(props);
        const gjeldendeSporsmalPlassering = this.finnGjeldendeSporsmalPlassering(props);
        return sporsmalIder[gjeldendeSporsmalPlassering];
    };

    getSporsmalIder = (props: Props): SporsmalId[] => {
        return props.children.map(child => child.props.sporsmalId);
    };

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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NySkjema));
