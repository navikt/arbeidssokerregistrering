import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../../ducks/innloggingsinfo';
import { hentAlder, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { hentFornavn } from '../../utils/utils';
import { FULLFOR_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import ResponsivSide from '../../komponenter/side/responsiv-side';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    innloggingsInfo: InnloggingsInfoState;
    state: AppState;
}

type EgenProps = StateProps;

const oppsummeringBesvarelser = (state: AppState) => {

    if (_.isEmpty(state.svar)) { return null; }
    const { brukerInfo } = state, { data } = brukerInfo, personId = data.id;
    return (
        <div className="oppsummering-besvarelser">
            <img
                src={oppsummeringSvg}
                alt="Oppsummering sjekkliste"
                className="oppsummering-besvarelser__illustrasjon"
            />
            <ul className="oppsummering-besvarelser__list">
                <li>
                    <Normaltekst>
                        <FormattedMessage
                            id="oppsummering-alder"
                            values={{alder: personId && hentAlder(personId)}}
                        />
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id="dinsituasjon-liste-1"/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id="dinsituasjon-liste-2"/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Siste stilling:&nbsp;{
                            state.svar['siste-stilling'] === 1
                                ? state.sisteStilling.data.stilling.label
                                : <FormattedMessage
                                    id={`oppsummering-sistestilling-svar-${state.svar['siste-stilling']}`}
                                />
                    }
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        Høyeste fullførte utdanning:&nbsp;
                        <FormattedMessage id={`utdanning-alternativ-${state.svar.utdanning}`}/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id={`oppsummering-utdanningbestatt-svar-${state.svar.utdanningbestatt}`}/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id={`oppsummering-utdanninggodkjent-svar-${state.svar.utdanninggodkjent}`}/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id={`oppsummering-helsehinder-svar-${state.svar.helsehinder}`}/>
                    </Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage id={`oppsummering-andreforhold-svar-${state.svar.andreforhold}`}/>
                    </Normaltekst>
                </li>
            </ul>
        </div>
    );
};

class Oppsummering extends React.Component<RouteComponentProps<MatchProps> & EgenProps> {

    componentWillMount() {
        const {state, history} = this.props;
        if (_.isEmpty(state.svar)) {
            history.push(`${SKJEMA_PATH}/0`);
        }
    }

    render() {
        const {history, innloggingsInfo, state} = this.props;
        const {name} = innloggingsInfo.data;
        return (
            <ResponsivSide>
                <Systemtittel tag="h1" className="oppsummering-tittel">
                    <FormattedMessage id="oppsummering-tittel" values={{fornavn: hentFornavn(name)}}/>
                </Systemtittel>
                <Normaltekst className="oppsummering-ingress">
                    <FormattedMessage id="oppsummering-ingress"/>
                </Normaltekst>

                {oppsummeringBesvarelser(state)}

                <Knappervertikalt>
                    <KnappBase
                        type="hoved"
                        onClick={() => history.push(FULLFOR_PATH)}
                    >
                        <FormattedMessage id="knapp-riktig"/>
                    </KnappBase>
                    <LenkeAvbryt/>
                </Knappervertikalt>
            </ResponsivSide>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    innloggingsInfo: selectInnloggingsinfo(state),
    state: state
});

export default connect(mapStateToProps)(
    Oppsummering
);
