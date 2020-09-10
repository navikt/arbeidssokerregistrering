import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVerikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import { AppState } from '../../reducer';
import { FULLFOR_PATH, START_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { erIE } from '../../utils/ie-test';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import OrdinaerOppsummeringBesvarelser from './ordinaer-oppsummering-besvarelser';
import './oppsummering.less';
import {
    State as RegistrerBrukerState,
} from '../../ducks/registrerbruker';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import FullforFeilhandtering from '../fullfor/feilhandtering/fullfor-feilhandtering';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import { erKlarForFullforing } from '../fullfor/fullfor-utils';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    state: AppState;
}

type Props = StateProps & RouteComponentProps<MatchProps> & InjectedIntlProps;

const OppsummeringOrdinaer = (props: Props) => {

    React.useEffect(() => {
        disableVerikalScrollingVedAnimasjon();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNesteBtnClicked = () => {
        const { history} = props;
        history.push(FULLFOR_PATH);
    };

    if (!erKlarForFullforing(props.state)) {
        return <Redirect to={START_PATH} />;
    }

    let classnames = 'oppsummering ';
    classnames += erIE() ? 'erIE' : '';

    const oppsummeringBesvarelser = <OrdinaerOppsummeringBesvarelser/>;
    const tekstPrefix = 'ordinaer-oppsummering';
    const knappTekstId = 'ordinaer-oppsummering-knapp-riktig';

    return (
        <Innholdslaster
            feilmeldingKomponent={<FullforFeilhandtering/>}
            avhengigheter={[props.registrerBrukerData]}
            loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
        >
            <section className={classnames}>
                <Innholdstittel tag="h1" className="oppsummering-tittel">
                    <FormattedMessage id={`${tekstPrefix}-tittel`}/>
                </Innholdstittel>
                <Normaltekst className="oppsummering-ingress">
                    <FormattedMessage id={`${tekstPrefix}-ingress`}/>
                </Normaltekst>
                {oppsummeringBesvarelser}
                <div className="lenke-avbryt-wrapper">
                    <KnappBase type="hoved" onClick={handleNesteBtnClicked} data-testid="neste">
                        <FormattedMessage id={knappTekstId}/>
                    </KnappBase>
                </div>
                <LenkeTilbake onClick={() => props.history.goBack()}/>
                <LenkeAvbryt wrapperClassname="wrapper-too"/>
            </section>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker,
    state: state
});

export default connect(mapStateToProps)(injectIntl(OppsummeringOrdinaer));
