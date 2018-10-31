import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { disableVerikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { FULLFOR_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import {
    UtdanningBestattSvar,
    UtdanningGodkjentSvar, UtdanningSvar
} from '../../ducks/svar-utils';
import OppsummeringElement from './oppsummering-element';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { getTekstIdForArbeidSisteManeder } from './oppsummering-utils';
import { ingenYrkesbakgrunn } from '../../ducks/siste-stilling';
import { SporsmalId } from '../../ducks/svar';

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
                <OppsummeringElement sporsmalId={SporsmalId.dinSituasjon}>
                    <FormattedMessage id={`oppsummering-dinsituasjon`}/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={SporsmalId.sisteStilling}
                    tekst={state.sisteStilling.data.stilling.label}
                    skjul={state.sisteStilling.data.stilling === ingenYrkesbakgrunn}
                >
                    <FormattedMessage id="oppsummering-sistestilling-fortekst"/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={SporsmalId.utdanning}
                    skjulHvisSvarErLik={[UtdanningSvar.INGEN_SVAR]}
                >
                    <FormattedMessage id="oppsummering-utdanning-fortekst"/>&nbsp;
                </OppsummeringElement>
                <OppsummeringElement
                    sporsmalId={SporsmalId.utdanningBestatt}
                    skjulHvisSvarErLik={UtdanningBestattSvar.INGEN_SVAR}
                />
                <OppsummeringElement
                    sporsmalId={SporsmalId.utdanningGodkjent}
                    skjulHvisSvarErLik={UtdanningGodkjentSvar.INGEN_SVAR}
                />
                <OppsummeringElement sporsmalId={SporsmalId.helseHinder}/>
                <OppsummeringElement sporsmalId={SporsmalId.andreForhold}/>
            </ul>
        </div>
    );
};

class Oppsummering extends React.Component<Props> {

    componentWillMount() {
        disableVerikalScrollingVedAnimasjon();
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
                    <KnappBase type="hoved" onClick={() => history.push(FULLFOR_PATH)} data-testid="neste">
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
