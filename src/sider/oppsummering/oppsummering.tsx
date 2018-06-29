import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { selectBrukersNavn, State as BrukersNavnState } from '../../ducks/brukers-navn';
import { hentAlder, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { hentFornavn } from '../../utils/utils';
import { FULLFOR_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { SisteStillingSvar, UtdanningBestattSvar, UtdanningGodkjentSvar } from '../../ducks/svar-utils';
import OppsummeringElement from './oppsummering-element';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    brukersNavn: BrukersNavnState;
    state: AppState;
}

type EgenProps = StateProps;

const oppsummeringBesvarelser = (state: AppState) => {

    if (_.isEmpty(state.svar)) {
        return null;
    }
    const {brukersFnr} = state, {data} = brukersFnr, personId = data.id;

    let alderElement;
    if (!_.isEmpty(data)) {
        alderElement = (
            <li className="typo-normal">
                <FormattedMessage
                    id="oppsummering-alder"
                    values={{alder: personId && hentAlder(personId)}}
                />
            </li>
        );
    }

    const dinSituasjon = (
        <li className="typo-normal">
            <FormattedMessage id={`oppsummering-din-situasjon`}/>
            <FormattedMessage id={`oppsummering-din-situasjon-svar-${state.svar['din-situasjon']}`}/>
        </li>
    );

    const sisteStilling = state.svar['siste-stilling'] === SisteStillingSvar.INGEN_SVAR ? (null) : (
        <li className="typo-normal">
            Siste stilling:&nbsp;{
            state.svar['siste-stilling'] === SisteStillingSvar.HAR_HATT_JOBB
                ? state.sisteStilling.data.stilling.label
                : <FormattedMessage
                    id={`oppsummering-sistestilling-svar-${state.svar['siste-stilling']}`}
                />
        }
        </li>
    );

    return (
        <div className="oppsummering-besvarelser">
            <img
                src={oppsummeringSvg}
                alt="Oppsummering sjekkliste"
                className="oppsummering-besvarelser__illustrasjon"
            />
            <ul className="oppsummering-besvarelser__list">
                {alderElement}
                <OppsummeringElement tekstId="dinsituasjon-liste-1"/>
                <OppsummeringElement tekstId="dinsituasjon-liste-2"/>
                {dinSituasjon}
                {sisteStilling}
                <OppsummeringElement sporsmalId={'utdanning'}>
                    Høyeste fullførte utdanning:&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={'utdanningbestatt'}
                    skjul={state.svar.utdanningbestatt === UtdanningBestattSvar.INGEN_SVAR}
                />
                <OppsummeringElement
                    sporsmalId={'utdanninggodkjent'}
                    skjul={state.svar.utdanninggodkjent === UtdanningGodkjentSvar.INGEN_SVAR}
                />
                <OppsummeringElement sporsmalId={'helsehinder'}/>
                <OppsummeringElement sporsmalId={'andreforhold'}/>
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
        const {history, brukersNavn, state} = this.props;
        const {name} = brukersNavn.data;
        return (
            <section className="oppsummering">
                <div className="limit">
                    <Innholdstittel tag="h1" className="oppsummering-tittel">
                        <FormattedMessage id="oppsummering-tittel" values={{fornavn: hentFornavn(name)}}/>
                    </Innholdstittel>
                    <Normaltekst className="oppsummering-ingress">
                        <FormattedMessage id="oppsummering-ingress"/>
                    </Normaltekst>

                    {oppsummeringBesvarelser(state)}

                    <div className="knapper-vertikalt">
                        <KnappBase type="hoved" onClick={() => history.push(FULLFOR_PATH)}>
                            <FormattedMessage id="knapp-riktig"/>
                        </KnappBase>
                        <LenkeAvbryt wrapperClassname="no-anim"/>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    brukersNavn: selectBrukersNavn(state),
    state: state
});

export default connect(mapStateToProps)(
    Oppsummering
);
