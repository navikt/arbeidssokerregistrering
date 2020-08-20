import * as React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import NavAlertStripe from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { disableVerikalScrollingVedAnimasjon, MatchProps } from '../../utils/utils';
import KnappFullfor from '../skjema-registrering/knapp-fullfor';
import { AppState } from '../../reducer';
import {
    Data as RegistrerBrukerData,
    State as RegistrerBrukerState,
    utforRegistrering
} from '../../ducks/registrerbruker';
import FullforFeilhandtering from './feilhandtering/fullfor-feilhandtering';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { STATUS } from '../../ducks/api-utils';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { DU_ER_NA_REGISTRERT_PATH } from '../../utils/konstanter';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import LenkeTilbake from '../../komponenter/knapper/lenke-tilbake';
import { erIE } from '../../utils/ie-test';
import { mapAvgitteSvarForBackend } from '../../ducks/registrerbruker-utils';
import { selectSisteStilling } from '../../ducks/siste-stilling';
import { RegistreringType } from '../../ducks/registreringstatus';

import utropstegnSvg from './utropstegn.svg';
import kalenderSvg from './kalender.svg';
import filnySvg from './fil-ny.svg';
import epostSvg from './epost.svg';
import okonomiSvg from './okonomi.svg';

import './fullfor.less';
import { erIFSS } from '../../utils/fss-utils';

interface StateProps {
    registrerBrukerData: RegistrerBrukerState;
    state: AppState;
}

interface DispatchProps {
    onRegistrerBruker: (data: RegistrerBrukerData, registreringType: RegistreringType) => Promise<void | {}>;
}

interface EgenState {
    markert: boolean;
    visAdvarsel: boolean;
    sblArbeidRegistrerBrukerStatus: string;
}

type Props = RouteComponentProps<MatchProps> & StateProps & DispatchProps & WithTranslation;

class Fullfor extends React.PureComponent<Props, EgenState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            markert: false,
            visAdvarsel: false,
            sblArbeidRegistrerBrukerStatus: STATUS.OK
        };
        this.settMarkert = this.settMarkert.bind(this);
        this.registrerBrukerOnClick = this.registrerBrukerOnClick.bind(this);
    }

    componentDidMount() {
        disableVerikalScrollingVedAnimasjon();
    }

    registrerBrukerOnClick() {

        // Veiledere trenger ikke å bekrefte
        if (!this.state.markert && !erIFSS()) {
            this.setState({ visAdvarsel: true });
            return;
        }

        this.setState((prevState) => ({ ...prevState, sblArbeidRegistrerBrukerStatus: STATUS.PENDING }));

        this.props.onRegistrerBruker(
            this.getSvarMappetForBackend(),
            RegistreringType.ORDINAER_REGISTRERING
        ).then(res => {
            if (!!res) {
                this.props.history.push(DU_ER_NA_REGISTRERT_PATH);
            }
        });
    }

    getSvarMappetForBackend() {
        const { state } = this.props;
        return mapAvgitteSvarForBackend(state.svar, selectSisteStilling(state),
            RegistreringType.ORDINAER_REGISTRERING);
    }

    settMarkert() {
        this.setState({
            markert: !this.state.markert
        });

        const { markert } = this.state;
        if (!markert) {
            this.setState({
                visAdvarsel: false
            });
        }
    }

    render() {
        const { registrerBrukerData, t } = this.props;

        const advarselElement = this.state.visAdvarsel && (
            <NavAlertStripe type="advarsel" className="fullfor-advarsel-stripe">
                <Normaltekst>
                    {t('fullfor-advarsel')}
                </Normaltekst>
            </NavAlertStripe>
        );

        return (
            <Innholdslaster
                feilmeldingKomponent={<FullforFeilhandtering />}
                avhengigheter={[registrerBrukerData, { status: this.state.sblArbeidRegistrerBrukerStatus }]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement} />}
            >
                <section className={`fullfor ${erIE() && 'erIE'}`}>
                    <Innholdstittel tag="h1" className="fullfor-tittel">
                        {t('fullfor-header')}
                    </Innholdstittel>
                    <div className="fullfor-sjekkliste">
                        <img
                            src={utropstegnSvg}
                            alt="Fullfør sjekkliste"
                            className="fullfor-sjekkliste__illustrasjon"
                        />

                        <Element tag="h2" className="fullfor-sjekkliste__heading">
                            {t('fullfor-overskrift-liste')}
                        </Element>

                        <ul className="fullfor-sjekkliste__liste">
                            <li className="typo-normal">
                                {t('fullfor-liste-1')}
                            </li>
                            <li className="typo-normal">
                                {t('fullfor-liste-2')}
                            </li>
                            <li className="typo-normal">
                                {t('fullfor-liste-3')}
                            </li>
                            <li className="typo-normal">
                                {t('fullfor-liste-4')}
                            </li>
                        </ul>
                    </div>

                    <div className="fullfor-info">
                        <Ekspanderbartpanel
                            tittel={t('fullfor-les-mer')}
                            border={true}
                            {...{ renderContentWhenClosed: true }}
                        >
                            <ul className="fullfor-info-liste">
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={okonomiSvg}
                                        alt="Økonomi"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Økonomi</Element>
                                    <Normaltekst>
                                        {t('fullfor-les-mer-okonomi')}
                                    </Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={epostSvg}
                                        alt="Meldekort"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Meldekort</Element>
                                    <Normaltekst>
                                        {t('fullfor-les-mer-meldekort')}
                                    </Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={kalenderSvg}
                                        alt="Aktivitetsplan"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">Aktivitetsplanen</Element>
                                    <Normaltekst>
                                        {t('fullfor-les-mer-aktivitetsplan')}
                                    </Normaltekst>
                                </li>
                                <li className="fullfor-info-liste__element">
                                    <img
                                        src={filnySvg}
                                        alt="CV"
                                        className="illustrasjon"
                                    />
                                    <Element className="tittel">CV</Element>
                                    <Normaltekst>
                                        {t('fullfor-les-mer-CV')}
                                    </Normaltekst>
                                </li>
                            </ul>
                        </Ekspanderbartpanel>
                    </div>
                    {!erIFSS() &&
                        <BekreftCheckboksPanel
                            onChange={this.settMarkert}
                            checked={this.state.markert}
                            label={t('fullfor-sjekkboks')}
                            className="fullfor-bekreft"
                        />
                    }
                    {advarselElement}
                    <div className="lenke-avbryt-wrapper">
                        <KnappFullfor
                            onClick={this.registrerBrukerOnClick}
                        />
                    </div>
                    <LenkeTilbake onClick={() => this.props.history.goBack()} />
                    <LenkeAvbryt wrapperClassname="wrapper-too" />
                </section>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    registrerBrukerData: state.registrerBruker,
    state: state,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    // @ts-ignore
    onRegistrerBruker: (data, registreringType: RegistreringType) =>
        dispatch(utforRegistrering(data, registreringType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    withTranslation()(Fullfor)
);
