import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SKJEMA_PATH, OPPSUMMERING_PATH } from '../../utils/konstanter';
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

interface StateProps {
    svarState: SvarState;
}

interface DispatchProps {
    endreSvar: (sporsmalId: string, svar: number) => void;
}

interface SkjemaProps {
    children: {};
}

type Props = StateProps & DispatchProps & InjectedIntlProps & SkjemaProps & RouteComponentProps<MatchProps>;

interface EgenStateProps {
    visAdvarsel: boolean;
}

export const INGEN_SVAR = -1;

class SkjemaContainer extends React.Component<Props, EgenStateProps> {
    private divRef: HTMLDivElement | null;
    private gjeldendeSporsmal: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            visAdvarsel: false
        };
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

        const fellesProps = {
            endreSvar: (sporsmalId, svar) => {
                this.props.endreSvar(sporsmalId, svar);
                this.toggleAdvarsel(false);
            },
            intl: this.props.intl,
            hentAvgittSvar: (sporsmalId: string) => this.props.svarState[sporsmalId],
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
            gaaTilbake: () => this.props.history.goBack(),
            gaaTilSporsmal: (sporsmal: number) => this.gaaTilSporsmal(sporsmal),
            hrefTilFullfor: `${OPPSUMMERING_PATH}`,
            advarselElement: this.state.visAdvarsel ? advarselElement : null,
            svar: this.props.svarState,
            settStateForUbesvartSporsmal: (sporsmalId) => this.props.endreSvar(sporsmalId, INGEN_SVAR),
            hrefTilSporsmal: (sporsmal) => `${SKJEMA_PATH}/${sporsmal}`,
        };

        return (
            <div className="limit" ref={(ref) => this.divRef = ref} tabIndex={-1}>
                <LastInnSisteStilling>
                    <Skjema {...skjemaProps}>
                        <SporsmalDinSituasjon sporsmalId="din-situasjon" {...fellesProps}/>
                        <SisteStilling sporsmalId="siste-stilling" {...fellesProps}/>
                        <Utdanningsporsmal sporsmalId="utdanning" {...fellesProps}/>
                        <UtdanningGodkjentSporsmal sporsmalId="utdanninggodkjent" {...fellesProps}/>
                        <UtdanningBestattSporsmal sporsmalId="utdanningbestatt" {...fellesProps}/>
                        <HelseHinder sporsmalId="helsehinder" {...fellesProps}/>
                        <AndreForhold sporsmalId="andreforhold" {...fellesProps}/>
                    </Skjema>
                </LastInnSisteStilling>
            </div>
        );
    }

    gaaTilSporsmal(sporsmal: number) {
        this.props.history.push(`${SKJEMA_PATH}/${sporsmal}`);
        this.gjeldendeSporsmal = sporsmal;
    }

    settGjeldendeSporsmalOgResetHvisNaN(sporsmal: string) {
        if (isNaN(Number(sporsmal))) {
            this.props.history.push(`${SKJEMA_PATH}/0`);
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
            this.props.history.push(`${SKJEMA_PATH}/0`);
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

            setTimeout(
                () => {
                    let scrollHeight = 0;
                    const header = document.querySelector('.siteheader');
                    if (header) {
                        scrollHeight = header.getBoundingClientRect().height;
                    }
                    window.scrollTo(0, scrollHeight);
                },
                0
            );
        }
    }

    gjeldendeSporsmalErEndret(otherProps: Props): boolean {
        const spmId = this.props.match.params.id;
        const forrigeSpmId = otherProps.match.params.id;
        return (spmId !== forrigeSpmId);
    }

    sporsmalErBesvart(sporsmalId: string): boolean {
        return !!this.props.svarState[sporsmalId];
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    svarState: state.svar,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaContainer));
