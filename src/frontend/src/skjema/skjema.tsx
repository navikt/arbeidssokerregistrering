import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import antallSporsmal from '../sporsmal/alle-sporsmal';
import { Systemtittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { endreSvarAction } from '../ducks/svar';
import { AppState } from '../reducer';
import Alternativ, { EndreSvar } from './alternativ';
import { RouteComponentProps } from 'react-router';
import KnappNeste from '../komponenter/knapper/knapp-neste';
import { configIkkeSelvgaende, erIkkeSelvgaende, erSvarAlternativMerEnnTo } from './skjema-utils';
import KnappAvbryt from '../komponenter/knapper/knapp-avbryt';
import { AVBRYT_PATH, OPPSUMMERING_PATH, SBLREG_PATH, SKJEMA_PATH } from '../utils/konstanter';
import Knapperad from '../komponenter/knapper/knapperad';

interface SkjemaProps {
    id: string;
    resetSvar: () => void;
}

export interface MatchProps {
    id: string;
}

interface StateProps {
    erAlleSpmBesvart: () => boolean;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvarId: (sporsmalId: string) => string;
}

interface DispatchProps {
    endreSvar: EndreSvar;
}

type Props = SkjemaProps & InjectedIntlProps & DispatchProps & StateProps & RouteComponentProps<MatchProps>;

class Skjema extends React.Component<Props> {
    private divRef: HTMLDivElement | null;

    componentDidMount() {
        if (this.divRef) {
            this.divRef.focus();
        }
    }

    componentDidUpdate(prevProps: Props) {
        const spmId = this.props.match.params.id;
        const forrigeSpmId = prevProps.match.params.id;

        if (spmId !== forrigeSpmId && this.divRef) {
            this.divRef.focus();
        }
    }

    render() {
        const { match,
            history,
            intl,
            endreSvar,
            sporsmalErBesvart,
            erAlleSpmBesvart,
            hentAvgittSvarId } = this.props;

        const spmId = match.params.id;

        if (spmId !== '1' &&
            (parseInt(spmId, 10) > antallSporsmal.length || !sporsmalErBesvart(`${parseInt(spmId, 10) - 1}`))) {
            history.push(`${SKJEMA_PATH}/1`);
            return null;
        }

        const disableKnappNeste = !sporsmalErBesvart(spmId);
        const disableKnappFullfor = erAlleSpmBesvart();

        return (
            <React.Fragment>
                <div className="blokk panel-skjema-wrapper" ref={(ref) => this.divRef = ref} tabIndex={-1}>
                    <Systemtittel tag="h1" className="spm-tittel">
                        {intl.messages[`sporsmal-${spmId}-tittel`]}
                    </Systemtittel>
                    <Panel className="panel-skjema">
                        <form className={`${erSvarAlternativMerEnnTo(spmId)} form-skjema`}>
                            {Array.from(Array(antallSporsmal[parseInt(spmId, 10) - 1]).keys())
                                .map(i => i + 1)
                                .map((key, index) => <Alternativ
                                    sporsmalId={spmId}
                                    endreSvar={endreSvar}
                                    key={key}
                                    alternativId={key.toString()}
                                    tekstId={`sporsmal-${spmId}-alternativ-${key}`}
                                    checked={key === parseInt(hentAvgittSvarId(spmId), 10)}
                                    intl={intl}
                                />)}
                        </form>
                    </Panel>
                </div>

                <Knapperad>
                    <KnappAvbryt
                        classname="mmr"
                        onClick={(() => {
                            history.push(`${AVBRYT_PATH}`);
                        })}
                    />
                    {
                        parseInt(spmId, 10) === antallSporsmal.length ?
                            <KnappNeste
                                disabled={disableKnappFullfor}
                                onClick={() => {
                                    if (erIkkeSelvgaende(hentAvgittSvarId(spmId), configIkkeSelvgaende[spmId])) {
                                        history.push(`${SBLREG_PATH}`);
                                    } else {
                                        history.push(`${OPPSUMMERING_PATH}`);
                                    }
                                }}
                            />
                            :
                            <KnappNeste
                                disabled={disableKnappNeste}
                                onClick={(() => {
                                    if (erIkkeSelvgaende(hentAvgittSvarId(spmId), configIkkeSelvgaende[spmId])) {
                                        history.push(`${SBLREG_PATH}`);
                                    } else {
                                        history.push(`${SKJEMA_PATH}/${(parseInt(spmId, 10) + 1)}`);
                                    }
                                })}
                            />
                    }
                </Knapperad>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        sporsmalErBesvart: (sporsmalId) => !!state.svar[sporsmalId],
        hentAvgittSvarId: (sporsmalId) => state.svar[sporsmalId],
        erAlleSpmBesvart: () => Object.keys(state.svar).filter(key => state.svar[key] === undefined).length !== 0,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)
(injectIntl(Skjema)
);