import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SKJEMA_PATH, OPPSUMMERING_PATH, START_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { endreSvarAction, SporsmalId } from '../../ducks/svar';
import Skjema from './skjema';
import { MatchProps } from '../../utils/utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { State as SvarState } from '../../ducks/svar';
import { erSporsmalBesvarte, hentSvar, IngenSvar, Svar } from '../../ducks/svar-utils';

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: SporsmalId, svar: Svar) => void;
}

interface SkjemaProps {
    children: {};
}

type Props = StateProps & DispatchProps & InjectedIntlProps & SkjemaProps & RouteComponentProps<MatchProps>;

interface EgenStateProps {
    visAdvarsel: boolean;
}

class SkjemaContainer extends React.Component<Props, EgenStateProps> {
    private divRef: HTMLDivElement | null;
    private gjeldendeSporsmal: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            visAdvarsel: false
        };

        // MIDLERTIDIG MÅLING TODO Fjern eller forbedre
        const { frontendlogger } = (window as any); // tslint:disable-line
        if (frontendlogger) {
            frontendlogger.event('registrering.harkommetinn', {}, {});
        }

        this.settGjeldendeSporsmalOgResetHvisNaN(this.props.match.params.id);

    }

    visAdvarsel(visAdvarsel: boolean) {
        this.setState({
            visAdvarsel: visAdvarsel
        });
    }

    render() {
        const advarselElement = (
            <NavAlertStripe type="advarsel" className="spm-advarsel">
                <Normaltekst>
                    <FormattedMessage id="skjema.alternativ.advarsel.tekst"/>
                </Normaltekst>
            </NavAlertStripe>
        );

        const {
            endreSvar,
            svarState,
            history,
        } = this.props;

        const skjemaProps = {
            gjeldendeSporsmal: this.gjeldendeSporsmal,
            sporsmalErBesvart: (spmId) => this.kanGaaVidereFraSporsmal(spmId),
            onNesteClick: (spmId: SporsmalId) => {
                const spmErBesvart = this.kanGaaVidereFraSporsmal(spmId);
                if (!spmErBesvart) {
                    this.visAdvarsel(true);
                }
            },
            gaaTilbake: () => {
                this.visAdvarsel(false);
                history.goBack();
            },
            gaaTilSporsmal: (sporsmal: number) => this.gaaTilSporsmal(sporsmal),
            hrefTilFullfor: `${OPPSUMMERING_PATH}`,
            advarselElement: this.state.visAdvarsel ? advarselElement : null,
            svar: svarState,
            settStateForUbesvartSporsmal: (sporsmalId) => endreSvar(sporsmalId, IngenSvar.INGEN_SVAR),
            hrefTilSporsmal: (sporsmal) => `${SKJEMA_PATH}/${sporsmal}`,
            visAdvarsel: (visAdvarsel: boolean) => this.visAdvarsel(visAdvarsel),
        };

        return (
            <Skjema {...skjemaProps}>
                {this.props.children}
            </Skjema>
        );
    }

    gaaTilSporsmal(sporsmal: number) {
        this.props.history.push(`${SKJEMA_PATH}/${sporsmal}`);
        this.gjeldendeSporsmal = sporsmal;
    }

    settGjeldendeSporsmalOgResetHvisNaN(sporsmal: string) {
        if (isNaN(Number(sporsmal))) {
            this.props.history.push(START_PATH);
            return;
        }
        this.gjeldendeSporsmal = Number(sporsmal);
    }

    componentWillMount() {
        this.gaaTilForsteSporsmalHvisDeForegaendeIkkeErBesvart();
    }

    gaaTilForsteSporsmalHvisDeForegaendeIkkeErBesvart() {
        const antallBesvarteSporsmal = Object.keys(this.props.svarState).length;
        if (this.gjeldendeSporsmal > antallBesvarteSporsmal) {
            this.props.history.push(START_PATH);
        }
    }

    componentWillUpdate(nextProps: Props) {
        if (this.gjeldendeSporsmalErEndret(nextProps)) {
            this.settGjeldendeSporsmalOgResetHvisNaN(nextProps.match.params.id);
        }
    }

    componentDidMount() {
        if (this.divRef) {
            this.divRef.focus();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (this.gjeldendeSporsmalErEndret(prevProps) && this.divRef) {
            this.divRef.focus();
        }
        this.skjulAdvarselHvisManKanGaaVidere();
    }

    skjulAdvarselHvisManKanGaaVidere() {
        const svarOgSporsmal = this.props.svarState[this.gjeldendeSporsmal];
        if (svarOgSporsmal && this.kanGaaVidereFraSporsmal(svarOgSporsmal.sporsmalId) && this.state.visAdvarsel) {
            this.visAdvarsel(false);
        }
    }

    gjeldendeSporsmalErEndret(otherProps: Props): boolean {
        const spmId = this.props.match.params.id;
        const forrigeSpmId = otherProps.match.params.id;
        return (spmId !== forrigeSpmId);
    }

    kanGaaVidereFraSporsmal(sporsmalId: SporsmalId): boolean {
        return this.sporsmalErBesvart(sporsmalId) || (sporsmalId === SporsmalId.sisteStilling);
    }

    sporsmalErBesvart(sporsmalId: SporsmalId): boolean {
        const svarState = this.props.svarState;
        return erSporsmalBesvarte(svarState, [sporsmalId]) && hentSvar(svarState, sporsmalId) !== IngenSvar.INGEN_SVAR;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaContainer));
