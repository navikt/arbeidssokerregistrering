import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AVBRYT_PATH, OPPSUMMERING_PATH, SBLREG_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import { AppState } from '../../reducer';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { endreSvarAction } from '../../ducks/svar';
import Skjema from './skjema';
import { MatchProps } from '../../utils/utils';
import Utdanningsporsmal from './sporsmal-utdanning';
import Helsesporsmal from './sporsmal-helse';

interface StateProps {
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvar: (sporsmalId: string) => number | undefined;
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
        this.settGjeldendeSporsmal(this.props.match.params.id);
    }

    render() {

        const fellesProps = {
            endreSvar: (sporsmalId, svar) => this.props.endreSvar(sporsmalId, svar),
            intl: this.props.intl,
            hentAvgittSvar: this.props.hentAvgittSvar
        };
        
        const generiskSkjemaProps = {
            gjeldendeSporsmal: this.gjeldendeSporsmal,
            sporsmalErBesvart: this.props.sporsmalErBesvart,
            gaaTilSporsmal: (sporsmal: number) => this.gaaTilSporsmal(sporsmal),
            gaaTilbake: () => this.props.history.goBack(),
            avbrytSkjema: () => this.props.history.push(`${AVBRYT_PATH}`),
            fullforSkjema: () => this.props.history.push(`${OPPSUMMERING_PATH}`),
            gaaTilSblRegistrering: () => this.props.history.push(`${SBLREG_PATH}`),
            hentAvgittSvar: this.props.hentAvgittSvar
        };

        return (
            <div className="blokk panel-skjema-wrapper" ref={(ref) => this.divRef = ref} tabIndex={-1}>
                <Skjema {...generiskSkjemaProps}>
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

    settGjeldendeSporsmal(sporsmal: string) {
        this.gjeldendeSporsmal = parseInt(sporsmal, 10);
    }

    /*
    Gå til spm 1 hvis forrige ikke er besvart
        if (spmId !== '1' &&
            (parseInt(spmId, 10) > antallSporsmal.length || !sporsmalErBesvart(`${parseInt(spmId, 10) - 1}`))) {
            history.push(`${SKJEMA_PATH}/1`);
            return null;
        }
     */

    gaaTilForsteSporsmalHvisDetForegaendeIkkeErBesvart() {
        //TODO ^ if (this.gjeldendeSporsmal )
    }

    componentWillUpdate(nextProps: Props) {
        if (this.gjeldendeSporsmalErEndret(nextProps)) {
            this.settGjeldendeSporsmal(nextProps.match.params.id);
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
    hentAvgittSvar: (sporsmalId) => state.svar[sporsmalId]
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SkjemaContainer));