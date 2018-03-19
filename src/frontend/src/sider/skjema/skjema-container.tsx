import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AVBRYT_PATH, SBLREG_PATH, SISTEARBFORHOLD_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { endreSvarAction } from '../../ducks/svar';
import Skjema from './skjema';
import { MatchProps } from '../../utils/utils';
import Utdanningsporsmal from './sporsmal-utdanning';
import Helsesporsmal from './sporsmal-helse';
import { erSelvgaende } from './skjema-utils';

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

class SkjemaContainer extends React.Component<Props> {
    private divRef: HTMLDivElement | null;
    private gjeldendeSporsmal: number;

    constructor(props: Props) {
        super(props);
        this.settGjeldendeSporsmalOgResetHvisNaN(this.props.match.params.id);
    }

    render() {

        const fellesProps = {
            endreSvar: (sporsmalId, svar) => this.props.endreSvar(sporsmalId, svar),
            intl: this.props.intl,
            hentAvgittSvar: this.props.hentAvgittSvar
        };

        const skjemaProps = {
            gjeldendeSporsmal: this.gjeldendeSporsmal,
            sporsmalErBesvart: this.props.sporsmalErBesvart,
            gaaTilbake: () => this.props.history.goBack(),
            avbrytSkjema: () => this.props.history.push(`${AVBRYT_PATH}`),
            gaaTilNesteSide: (gjeldendeSporsmalId: string, antallSporsmal: number) =>
                this.gaaTilNesteSide(gjeldendeSporsmalId, antallSporsmal)
        };

        return (
            <div className="skjema-container-wrapper" ref={(ref) => this.divRef = ref} tabIndex={-1}>
                <Skjema {...skjemaProps}>
                    <Helsesporsmal sporsmalId="helse" {...fellesProps}/>
                    <Utdanningsporsmal sporsmalId="utdanning" {...fellesProps}/>
                </Skjema>
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
            this.props.history.push(`${SISTEARBFORHOLD_PATH}`);
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