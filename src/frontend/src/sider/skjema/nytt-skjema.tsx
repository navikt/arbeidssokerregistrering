import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {AVBRYT_PATH, SKJEMA_PATH} from '../../utils/konstanter';
import {AppState} from '../../reducer';
import {InjectedIntlProps, injectIntl} from 'react-intl';
import {connect, Dispatch} from 'react-redux';
import {endreSvarAction} from '../../ducks/svar';
import GeneriskSkjema from './generisk-skjema';
import Helsesporsmal from "./sporsmal-helse";
import {MatchProps} from "../../utils/utils";

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

class NyttSkjema extends React.Component<Props> {

    gjeldendeSporsmal: number;

    constructor(props: Props) {
        super(props);
        this.gjeldendeSporsmal = parseInt(props.match.params.id, 10);
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
            avbrytSkjema: () => this.avbrytSkjema(),
            gaaTilSporsmal: (sporsmal: number) => this.gaaTilSporsmal(sporsmal),
            gaaTilbake: () => this.gaaTilbake()
        };

        return (
            <GeneriskSkjema {...generiskSkjemaProps}>
                <Helsesporsmal sporsmalId="helse" {...fellesProps}/>
            </GeneriskSkjema>
        );
    }

    avbrytSkjema() {
        this.props.history.push(`${AVBRYT_PATH}`);
    }

    gaaTilSporsmal(sporsmal: number) {
        this.props.history.push(`${SKJEMA_PATH}/${sporsmal}`);
        this.gjeldendeSporsmal = sporsmal;
    }

    gaaTilbake() {
        this.props.history.goBack();
    }

    erAlleSporsmalBesvart() {
        // implementer
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sporsmalErBesvart: (sporsmalId) => !!state.svar[sporsmalId],
    hentAvgittSvar: (sporsmalId) => state.svar[sporsmalId]
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NyttSkjema));