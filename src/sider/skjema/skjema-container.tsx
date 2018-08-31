import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SKJEMA_PATH, OPPSUMMERING_PATH, START_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { endreSvarAction } from '../../ducks/svar';
import Skjema from './skjema';
import { MatchProps } from '../../utils/utils';
import Utdanningsporsmal from './sporsmal/sporsmal-utdanning';
import SisteStilling from './sporsmal/sporsmal-siste-stilling/siste-stilling';
import LastInnSisteStilling from './last-inn-siste-stilling';
import UtdanningBestattSporsmal from './sporsmal/sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from './sporsmal/sporsmal-utdanning-godkjent';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';
import AndreForhold from './sporsmal/sporsmal-andre-forhold';
import HelseHinder from './sporsmal/sporsmal-helse-hinder';
import SporsmalDinSituasjon from './sporsmal/sporsmal-din-situasjon';
import { State as SvarState } from '../../ducks/svar';
import { IngenSvar, Svar } from '../../ducks/svar-utils';

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: Svar) => void;
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

    toggleAdvarsel(toggle: boolean) {
        this.setState({
            visAdvarsel: toggle
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
            intl,
            history,
        } = this.props;

        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                endreSvar(sporsmalId, svar);
                this.toggleAdvarsel(false);
            },
            intl: intl,
            hentAvgittSvar: (sporsmalId: string) => svarState[sporsmalId],
        };

        const skjemaProps = {
            gjeldendeSporsmal: this.gjeldendeSporsmal,
            sporsmalErBesvart: (spmId) => this.sporsmalErBesvart(spmId),
            onNesteClick: (spmId: string) => {
                const spmErBesvart = this.sporsmalErBesvart(spmId);
                if (!spmErBesvart) {
                    this.toggleAdvarsel(true);
                }
            },
            gaaTilbake: () => history.goBack(),
            gaaTilSporsmal: (sporsmal: number) => this.gaaTilSporsmal(sporsmal),
            hrefTilFullfor: `${OPPSUMMERING_PATH}`,
            advarselElement: this.state.visAdvarsel ? advarselElement : null,
            svar: svarState,
            settStateForUbesvartSporsmal: (sporsmalId) => endreSvar(sporsmalId, IngenSvar.INGEN_SVAR),
            hrefTilSporsmal: (sporsmal) => `${SKJEMA_PATH}/${sporsmal}`,
        };

        return (
            <LastInnSisteStilling>
                <Skjema {...skjemaProps}>
                    <SporsmalDinSituasjon sporsmalId="dinSituasjon" {...fellesProps}/>
                    <SisteStilling sporsmalId="sisteStilling" {...fellesProps}/>
                    <Utdanningsporsmal sporsmalId="utdanning" {...fellesProps}/>
                    <UtdanningGodkjentSporsmal sporsmalId="utdanningGodkjent" {...fellesProps}/>
                    <UtdanningBestattSporsmal sporsmalId="utdanningBestatt" {...fellesProps}/>
                    <HelseHinder sporsmalId="helseHinder" {...fellesProps}/>
                    <AndreForhold sporsmalId="andreForhold" {...fellesProps}/>
                </Skjema>
            </LastInnSisteStilling>
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
    }

    gjeldendeSporsmalErEndret(otherProps: Props): boolean {
        const spmId = this.props.match.params.id;
        const forrigeSpmId = otherProps.match.params.id;
        return (spmId !== forrigeSpmId);
    }

    sporsmalErBesvart(sporsmalId: string): boolean {
        if (!this.props.svarState[sporsmalId]) {
            return false;
        } else if ((sporsmalId !== 'sisteStilling') && (this.props.svarState[sporsmalId] === IngenSvar.INGEN_SVAR)) {
            return false; // TODO FO-1463 Vi må finne en bedre fiks på dette.
        }
        return true;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, svar) => dispatch(endreSvarAction(sporsmalId, svar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaContainer));
