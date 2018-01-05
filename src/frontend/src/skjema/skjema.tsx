import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import antallSporsmal from '../sporsmal/alle-sporsmal';
import { Undertittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import { endreSvarAction } from '../ducks/svar';
import { AppState } from '../reducer';
import Alternativ, { EndreSvar } from './alternativ';
import { RouteComponentProps } from 'react-router';
import KnappNeste from './knapp-neste';
import KnappFullfor from './knapp-fullfor';
import { configSpmPrSide, erSelvgaende, erSvarAlternativMerEnnTo, visRiktigCssMarginBottom } from './skjema-utils';
import KnappAvbryt from './knapp-avbryt';

interface SkjemaProps {
    id: string;
    resetSvar: () => void;
}

export interface MatchProps {
    id: string;
}

interface StateProps {
    erSelvgaendeBruker: () => boolean;
    erAlleSpmBesvart: () => boolean;
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvarId: (sporsmalId: string) => string;
}

interface DispatchProps {
    endreSvar: EndreSvar;
}

type Props = SkjemaProps & InjectedIntlProps & DispatchProps & StateProps & RouteComponentProps<MatchProps>;

function Skjema({
                    match,
                    history,
                    intl,
                    endreSvar,
                    sporsmalErBesvart,
                    erAlleSpmBesvart,
                    erSelvgaendeBruker,
                    hentAvgittSvarId
                }: Props) {

    const sideId = match.params.id;
    const spmListePaSiden = configSpmPrSide[sideId];

    if (spmListePaSiden === undefined) {
        history.push('/skjema/1');
        return null;
    }

    const disableKnappNeste = spmListePaSiden.filter((spmId: string) => !sporsmalErBesvart(spmId)).length !== 0;
    const disableKnappFullfor = erAlleSpmBesvart();

    return (
        <div>
            {
                spmListePaSiden
                    .map((spmId: string) => (
                        <div
                            key={spmId}
                            className={`${visRiktigCssMarginBottom(spmListePaSiden, spmId)} panel-skjema-wrapper`}
                        >
                            <Undertittel className="spm-tittel">
                                {intl.messages[`sporsmal-${spmId}-tittel`]}
                            </Undertittel>
                            <Panel className="panel-skjema">
                                <form className={`${erSvarAlternativMerEnnTo(spmId)} form-skjema`}>
                                    {Array.from(Array(antallSporsmal[parseInt(spmId, 10) - 1]).keys())
                                        .map(i => i + 1)
                                        .map((key) => <Alternativ
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
                    ))
            }

            <div className="panel-info__knapperad">
                <KnappAvbryt
                    classname="mmr"
                    onClick={(() => {
                        history.push('/avbryt');
                    })}
                />
                {
                    parseInt(sideId, 10) === Object.keys(configSpmPrSide).length ?
                        <KnappFullfor
                            disabled={disableKnappFullfor}
                            onClick={() => {
                                if (erSelvgaendeBruker()) {
                                    history.push('/oppsummering');
                                } else {
                                    history.push('/sblregistrering');
                                }
                            }}
                        />
                        :
                        <KnappNeste
                            disabled={disableKnappNeste}
                            onClick={(() => {
                                history.push(`/skjema/${(parseInt(sideId, 10) + 1)}`);
                            })}
                        />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    sporsmalErBesvart: (sporsmalId) => !!state.svar[sporsmalId],
    hentAvgittSvarId: (sporsmalId) => state.svar[sporsmalId],
    erAlleSpmBesvart: () => Object.keys(state.svar).filter(key => state.svar[key] === undefined).length !== 0,
    erSelvgaendeBruker: () => erSelvgaende(state.svar)
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)
(injectIntl(Skjema)
);