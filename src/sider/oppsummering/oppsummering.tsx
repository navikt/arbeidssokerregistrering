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
import { INGEN_SVAR } from '../skjema/skjema-container';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';

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

    const dinSituasjon = state.svar['din-situasjon'] === INGEN_SVAR ? (null) : (
        <li className="typo-normal">
            <FormattedMessage id={`oppsummering-din-situasjon`} />
            <FormattedMessage id={`oppsummering-din-situasjon-svar-${state.svar['din-situasjon']}`} />
        </li>
    );

    const sisteStilling = state.svar['siste-stilling'] === INGEN_SVAR ? (null) : (
        <li className="typo-normal">
            Siste stilling:&nbsp;{
            state.svar['siste-stilling'] === 1
                ? state.sisteStilling.data.stilling.label
                : <FormattedMessage
                    id={`oppsummering-sistestilling-svar-${state.svar['siste-stilling']}`}
                />
        }
        </li>
    );

    const utdanningBestatt = state.svar.utdanningbestatt === INGEN_SVAR ? (null) : (
        <li className="typo-normal">
            <FormattedMessage id={`oppsummering-utdanningbestatt-svar-${state.svar.utdanningbestatt}`} />
        </li>
    );

    const utdanningGodkjent = state.svar.utdanninggodkjent === INGEN_SVAR ? (null) : (
        <li className="typo-normal">
            <FormattedMessage id={`oppsummering-utdanningbestatt-svar-${state.svar.utdanningbestatt}`} />
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
                <li className="typo-normal">
                    <FormattedMessage id="dinsituasjon-liste-1" />
                </li>
                <li className="typo-normal">
                    <FormattedMessage id="dinsituasjon-liste-2" />
                </li>
                {dinSituasjon}
                {sisteStilling}
                <li className="typo-normal">
                    Høyeste fullførte utdanning:&nbsp;
                    <FormattedMessage id={`utdanning-alternativ-${state.svar.utdanning}`} />
                </li>
                {utdanningBestatt}
                {utdanningGodkjent}
                <li className="typo-normal">
                    <FormattedMessage id={`oppsummering-helsehinder-svar-${state.svar.helsehinder}`} />
                </li>
                <li className="typo-normal">
                    <FormattedMessage id={`oppsummering-andreforhold-svar-${state.svar.andreforhold}`} />
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
        const {history, brukersNavn, state} = this.props;
        const {name} = brukersNavn.data;
        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';

        return (
            <div className="limit">
                <section className={classnames}>
                    <Innholdstittel tag="h1" className="oppsummering-tittel">
                        <FormattedMessage id="oppsummering-tittel" values={{fornavn: hentFornavn(name)}} />
                    </Innholdstittel>
                    <Normaltekst className="oppsummering-ingress">
                        <FormattedMessage id="oppsummering-ingress" />
                    </Normaltekst>

                    {oppsummeringBesvarelser(state)}

                    <div className="knapper-vertikalt">
                        <KnappBase type="hoved" onClick={() => history.push(FULLFOR_PATH)}>
                            <FormattedMessage id="knapp-riktig" />
                        </KnappBase>
                        <LenkeTilbake onClick={() => this.props.history.goBack()}/>
                        <LenkeAvbryt wrapperClassname="no-anim" />
                    </div>
                </section>
            </div>
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
