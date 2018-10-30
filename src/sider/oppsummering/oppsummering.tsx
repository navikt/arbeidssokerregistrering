import * as React from 'react';
import { connect } from 'react-redux';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { disableVerikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { AppState } from '../../reducer';
import { FULLFOR_PATH, START_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RegistreringType } from '../../ducks/registreringstatus';
import OrdinaerOppsummeringBesvarelser from './ordinaer-oppsummering-besvarelser';
import SykmeldtOppsummeringBesvarelser from './sykmeldt-oppsummering-besvarelser';
import { erKlarForFullforing } from '../fullfor/fullfor-utils';

interface StateProps {
    state: AppState;
}

type Props = StateProps & RouteComponentProps<MatchProps>;

class Oppsummering extends React.Component<Props> {

    componentWillMount() {

        if (!erKlarForFullforing(this.props.state)) {
            this.props.history.push(START_PATH);
        }

        disableVerikalScrollingVedAnimasjon();
    }

    render() {
        const { history, state } = this.props;
        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';

        const visOrdinaerBesvarelser = state.registreringStatus.data.registreringType
            === RegistreringType.ORDINAER_REGISTRERING;

        const oppsummeringBesvarelser = visOrdinaerBesvarelser ?
            (<OrdinaerOppsummeringBesvarelser/>) :
            (<SykmeldtOppsummeringBesvarelser/>);

        const tekstPrefix = (visOrdinaerBesvarelser ? 'ordinaer' : 'sykmeldt') + '-oppsummering';

        return (
            <section className={classnames}>
                <Innholdstittel tag="h1" className="oppsummering-tittel">
                    <FormattedMessage id={`${tekstPrefix}-tittel`} />
                </Innholdstittel>
                <Normaltekst className="oppsummering-ingress">
                    <FormattedMessage id={`${tekstPrefix}-ingress`}/>
                </Normaltekst>

                {oppsummeringBesvarelser}

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
