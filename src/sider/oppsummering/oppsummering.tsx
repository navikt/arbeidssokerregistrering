import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { FULLFOR_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import {
    SisteStillingSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar, UtdanningSvar
} from '../../ducks/svar-utils';
import OppsummeringElement from './oppsummering-element';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';

const oppsummeringSvg = require('./oppsummering.svg');

interface StateProps {
    state: AppState;
}

export type Props = RouteComponentProps<MatchProps> & StateProps;

const oppsummeringBesvarelser = (state: AppState) => {
    const svar = state.svar;

    if (_.isEmpty(svar)) {
        return null;
    }

    const registreringStatus = state.registreringStatus.data;
    const jobbetSeksAvTolvSisteManederTekstId = getTekstIdForArbeidSisteManeder(svar, registreringStatus);
    
    return (
        <div className="oppsummering-besvarelser">
            <img
                src={oppsummeringSvg}
                alt="Oppsummering sjekkliste"
                className="oppsummering-besvarelser__illustrasjon"
            />
            <ul className="oppsummering-besvarelser__list">
                <OppsummeringElement
                    tekstId={jobbetSeksAvTolvSisteManederTekstId}
                    skjul={jobbetSeksAvTolvSisteManederTekstId === ''}
                />
                <OppsummeringElement sporsmalId="dinSituasjon">
                    <FormattedMessage id={`oppsummering-dinsituasjon`}/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId="sisteStilling"
                    tekst={state.sisteStilling.data.stilling.label}
                    skjulHvisSvarErLik={[SisteStillingSvar.INGEN_SVAR, SisteStillingSvar.HAR_IKKE_HATT_JOBB]}
                >
                    <FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={'utdanning'}
                    skjulHvisSvarErLik={[UtdanningSvar.INGEN_SVAR]}
                >
                    <FormattedMessage id="oppsummering-utdanning-fortekst"/>&nbsp;
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

class Oppsummering extends React.Component<Props> {

    componentWillMount() {
        const {state, history} = this.props;
        if (_.isEmpty(state.svar)) {
            history.push(`${SKJEMA_PATH}/0`);
        }
    }

    render() {
        const {history, state} = this.props;
        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';

        return (
            <section className={classnames}>
                <Innholdstittel tag="h1" className="oppsummering-tittel">
                    <FormattedMessage id="oppsummering-tittel" />
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
    state: state
});

export default connect(mapStateToProps)(
    Oppsummering
);
