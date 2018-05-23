import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SBLREG_PATH, FULLFOR_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { endreSvarAction } from '../../ducks/svar';
import Skjema from './skjema';
import { MatchProps } from '../../utils/utils';
import Utdanningsporsmal from './sporsmal-utdanning';
import Helsesporsmal from './sporsmal-helse';
import { erSelvgaende } from './skjema-utils';
import SisteStilling from './sporsmal-siste-stilling/siste-stilling';
import LastInnSisteStilling from './sporsmal-siste-stilling/last-inn-siste-stilling';
import UtdanningBestattSporsmal from './sporsmal-utdanning-bestatt';
import UtdanningGodkjentSporsmal from './sporsmal-utdanning-godkjent';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import NavAlertStripe from 'nav-frontend-alertstriper';

interface StateProps {
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
    antallBesvarteSporsmal: number;
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
            <NavAlertStripe type="advarsel">
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
            hentAvgittSvar: this.props.hentAvgittSvar
        };

        const skjemaProps = {
            gjeldendeSporsmal: this.gjeldendeSporsmal,
            sporsmalErBesvart: (spmId) => {
                const spmErBesvart = this.props.sporsmalErBesvart(spmId);
                if (!spmErBesvart) {
                    this.toggleAdvarsel(true);
                }
                return spmErBesvart;
            },
            gaaTilbake: () => this.props.history.goBack(),
            gaaTilNesteSide: (gjeldendeSporsmalId: string, antallSporsmal: number) =>
                this.gaaTilNesteSide(gjeldendeSporsmalId, antallSporsmal),
            advarselElement: this.state.visAdvarsel ? advarselElement : null
        };

        return (
            <div className="skjema-container-wrapper" ref={(ref) => this.divRef = ref} tabIndex={-1}>
                <LastInnSisteStilling>
                    <Skjema {...skjemaProps}>
                        <Helsesporsmal sporsmalId="helse" {...fellesProps}/>
                        <Utdanningsporsmal sporsmalId="utdanning" {...fellesProps}/>
                        <UtdanningBestattSporsmal sporsmalId="utdanning-bestatt" {...fellesProps}/>
                        <UtdanningGodkjentSporsmal sporsmalId="utdanning-godkjent" {...fellesProps}/>
                        <SisteStilling sporsmalId="siste-stilling" {...fellesProps}/>
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

    gaaTilNesteSide(gjeldendeSporsmalId: string, antallSporsmal: number) {
        if (!this.avgittSvarGirSelvgaendeBruker(gjeldendeSporsmalId)) {
            this.props.history.push(`${SBLREG_PATH}`);
            return;
        }

        if (this.erSisteSporsmal(antallSporsmal)) {
            this.props.history.push(`${FULLFOR_PATH}`);
            return;
        }

        this.gaaTilSporsmal(this.gjeldendeSporsmal + 1);
    }

    erSisteSporsmal(antallSporsmal: number) {
        return this.gjeldendeSporsmal === (antallSporsmal - 1);
    }

    avgittSvarGirSelvgaendeBruker(gjeldendeSporsmalId: string) {
        return erSelvgaende(gjeldendeSporsmalId, this.props.hentAvgittSvar(gjeldendeSporsmalId));
    }

    componentWillMount() {
        this.gaaTilForsteSporsmalHvisDeForegaendeIkkeErBesvart();
    }

    gaaTilForsteSporsmalHvisDeForegaendeIkkeErBesvart() {
        if (this.gjeldendeSporsmal > this.props.antallBesvarteSporsmal) {
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
        }
    }

    gjeldendeSporsmalErEndret(otherProps: Props): boolean {
        const spmId = this.props.match.params.id;
        const forrigeSpmId = otherProps.match.params.id;
        return (spmId !== forrigeSpmId);
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sporsmalErBesvart: (sporsmalId) => !!state.svar[sporsmalId],
    hentAvgittSvar: (sporsmalId) => state.svar[sporsmalId],
    antallBesvarteSporsmal: Object.keys(state.svar).length
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaContainer));