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

interface SkjemaProps {
    id: string;
    resetSvar: () => void;
}

export interface MatchProps {
    id: string;
}

interface StateProps {
    sporsmalErBesvart: (sporsmalId: string) => boolean;
    hentAvgittSvarId: (sporsmalId: string) => string;
}

interface DispatchProps {
    endreSvar: EndreSvar;
}

type Props = SkjemaProps & InjectedIntlProps & DispatchProps & StateProps & RouteComponentProps<MatchProps>;

function Skjema({match, history, intl, endreSvar, sporsmalErBesvart, hentAvgittSvarId}: Props) {
    const sporsmalId = match.params.id;
    const antallAlternativer = antallSporsmal[parseInt(sporsmalId, 10) - 1];
    const tittelId = `sporsmal-${sporsmalId}-tittel`;
    const avgittSvarId = parseInt(hentAvgittSvarId(sporsmalId), 10);

    return (
        <div>
            <Undertittel className="blokk-xxs">{intl.messages[tittelId]}</Undertittel>
            <Panel className="blokk-s">
                <form >
                    {Array.from(Array(antallAlternativer).keys())
                        .map(i => i + 1)
                        .map((key) => <Alternativ
                            sporsmalId={sporsmalId}
                            endreSvar={endreSvar}
                            key={key}
                            tekstId={`sporsmal-${sporsmalId}-alternativ-${key}`}
                            checked={key === avgittSvarId}
                            intl={intl}
                        />)}
                </form>
            </Panel>
            <div className="skjema-knapper">
                {
                    parseInt(sporsmalId, 10) === antallSporsmal.length ?
                        <KnappFullfor
                            disabled={!sporsmalErBesvart(sporsmalId)}
                            onClick={() => history.push('/oppsummering')}
                        />
                        :
                        <KnappNeste
                            disabled={!sporsmalErBesvart(sporsmalId)}
                            onClick={(() => {
                                history.push(`/skjema/${(parseInt(sporsmalId, 10) + 1)}`);
                            })}
                        />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    sporsmalErBesvart: (sporsmalId) => !!state.svar[sporsmalId],
    hentAvgittSvarId: (sporsmalId) => state.svar[sporsmalId]
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    endreSvar: (sporsmalId, alternativId) => dispatch(endreSvarAction(sporsmalId, alternativId)),
});

export default connect(mapStateToProps, mapDispatchToProps)
(injectIntl(Skjema)
);