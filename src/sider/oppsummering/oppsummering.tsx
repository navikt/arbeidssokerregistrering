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
import {
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar
} from '../../ducks/svar-utils';
import OppsummeringElement from './oppsummering-element';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    brukersNavn: BrukersNavnState;
    state: AppState;
}

type EgenProps = StateProps;

const oppsummeringBesvarelser = (state: AppState) => {
    const personId = state.brukersFnr.data.id;
    const svar = state.svar;

    if (_.isEmpty(svar)) {
        return null;
    }

    const registreringStatus = state.registreringStatus.data;

    const jobbetSeksAvTolvSisteManederTekstId = registreringStatus.jobbetSeksAvTolvSisteManeder
        ? 'oppsummering-arbeidserfaring-1'
        : 'oppsummering-arbeidserfaring-2';

    return (
        <div className="oppsummering-besvarelser">
            <img
                src={oppsummeringSvg}
                alt="Oppsummering sjekkliste"
                className="oppsummering-besvarelser__illustrasjon"
            />
            <ul className="oppsummering-besvarelser__list">
                <OppsummeringElement tekstId="oppsummering-alder" values={{alder: personId && hentAlder(personId)}}/>
                <OppsummeringElement tekstId={jobbetSeksAvTolvSisteManederTekstId}/>
                <OppsummeringElement sporsmalId="dinSituasjon">
                    <FormattedMessage id={`oppsummering-dinsituasjon`}/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId="sisteStilling"
                    tekst={state.sisteStilling.data.stilling.label}
                    skjulHvisSvarErLik={[SisteStillingSvar.INGEN_SVAR, SisteStillingSvar.HAR_IKKE_HATT_JOBB]}
                >
                    Siste stilling:&nbsp;
                </OppsummeringElement>
                <OppsummeringElement sporsmalId={'utdanning'}>
                    Høyeste fullførte utdanning:&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={'utdanningBestatt'}
                    skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
                />
                <OppsummeringElement
                    sporsmalId={'utdanningGodkjent'}
                    skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
                />
                <OppsummeringElement sporsmalId={'helseHinder'}/>
                <OppsummeringElement sporsmalId={'andreForhold'}/>
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
            <section className={classnames}>
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
                    <LenkeTilbake onClick={() => this.props.history.goBack()}/>
                    <LenkeAvbryt wrapperClassname="no-anim"/>
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
