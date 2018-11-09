import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVertikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { AppState } from '../../reducer';
import { FULLFOR_PATH, START_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { RegistreringType } from '../../ducks/registreringstatus';
import OrdinaerOppsummeringBesvarelser from './ordinaer-oppsummering-besvarelser';
import SykmeldtOppsummeringBesvarelser from './sykmeldt-oppsummering-besvarelser';
import { erKlarForFullforing } from '../fullfor/fullfor-utils';

import './oppsummering.less';

interface StateProps {
    state: AppState;
}

type Props = StateProps & RouteComponentProps<MatchProps>;

class Oppsummering extends React.Component<Props> {

    componentWillMount() {

        if (!erKlarForFullforing(this.props.state)) {
            this.props.history.push(START_PATH);
        }

        disableVertikalScrollingVedAnimasjon();

    }

    render() {
        const {history, state} = this.props;
        let classnames = 'oppsummering ';
        classnames += erIE() ? 'erIE' : '';
        classnames += ' limit';

        const visOrdinaerBesvarelser = state.registreringStatus.data.registreringType
            === RegistreringType.ORDINAER_REGISTRERING;

        const oppsummeringBesvarelser = visOrdinaerBesvarelser ?
            (<OrdinaerOppsummeringBesvarelser/>) :
            (<SykmeldtOppsummeringBesvarelser/>);

        const tekstPrefix = (visOrdinaerBesvarelser ? 'ordinaer' : 'sykmeldt') + '-oppsummering';

        return (
            <section className={classnames}>
                <Innholdstittel tag="h1" className="oppsummering-tittel">
                    <FormattedMessage id={`${tekstPrefix}-tittel`}/>
                </Innholdstittel>
                <Normaltekst className="oppsummering-ingress">
                    <FormattedMessage id={`${tekstPrefix}-ingress`}/>
                </Normaltekst>
                {oppsummeringBesvarelser}
                <div className="lenke-avbryt-wrapper">
                    <KnappBase type="hoved" onClick={() => history.push(FULLFOR_PATH)} data-testid="neste">
                        <FormattedMessage id="knapp-riktig"/>
                    </KnappBase>
                </div>
                <LenkeTilbake onClick={() => this.props.history.goBack()}/>
                <LenkeAvbryt wrapperClassname="wrapper-too"/>
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
