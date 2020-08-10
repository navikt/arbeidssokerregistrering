import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import './registrering-arbeidssoker.less';
import { Innholdstittel, Normaltekst, Undertittel, Element, Sidetittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import KnappBase from 'nav-frontend-knapper';
import { withTranslation, WithTranslation } from 'react-i18next'

import aktplanbilde from './aktivitetsplan-ill.svg';
import paragrafbilde from './paragraf.svg';
import infobilde from './info.svg';
import { MatchProps } from '../../utils/utils';
import { SKJEMA_PATH } from '../../utils/konstanter';
import InformasjonModal from './informasjon/informasjon-modal';
import { AppState } from '../../reducer';
import { Data as FeatureToggleData, selectFeatureToggles } from '../../ducks/feature-toggles';
import { frontendLogger } from '../../metrikker/metrics-utils';

interface Props {
    featureToggles: FeatureToggleData;
}

type RegistreringArbeidssokerProps = Props & RouteComponentProps<MatchProps> & WithTranslation;

interface State {
    isModalOpen: boolean;
}

class RegistreringArbeidssoker extends React.Component<RegistreringArbeidssokerProps, State> {

    state = {
        isModalOpen: false
    };

    handleSeVideoBtnClicked = () => {
        frontendLogger('registrering.start.video.open', {}, {});
        this.setState({ isModalOpen: true });
    }

    handleModalLukkeknappClicked = () => {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { t } = this.props

        const Rad1 = () => {
            return (
                <div className="registrering-arbeidssoker__rad1">
                    <Innholdstittel tag="h2" className="rad__tittel rad1__tittel">
                        {t('registrering-arbeidssoker.introtittel')}
                    </Innholdstittel>
                    <div className="rad1__innhold">
                        <Normaltekst className="rad__innhold-tekst" tag="div">
                            <ul>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del1')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del2')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del3')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del4')}
                                </li>
                            </ul>
                            <Knapp onClick={this.handleSeVideoBtnClicked}>
                                {t('registrering-arbeidssoker.argument1knapp')}
                            </Knapp>
                        </Normaltekst>
                        <div className="rad__innhold-ikon">
                            <img className="rad1__ikon" src={aktplanbilde} alt="Arbeidssøker-ikon" />
                        </div>
                    </div>
                    <InformasjonModal
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.handleModalLukkeknappClicked}
                    />
                </div>
            );
        };

        const Rad2 = () => {
            return (
                <div className="registrering-arbeidssoker__rad2 rad-even">
                    <div className="rad2-wrapper">
                        <div className="rad2__boks rad2__rettigheter">
                            <img className="rad__ikon" src={paragrafbilde} alt="Rettigheter" />
                            <Undertittel tag="h2" className="rad__tittel rettigheter__tittel">
                                {t('registrering-arbeidssoker.argument2tittel1')}
                            </Undertittel>
                            <Normaltekst tag="div">
                                <ul>
                                    <li>
                                        {t('registrering-arbeidssoker.argument2-liste1-del1')}
                                        <a className="lenke"
                                            href="https://lovdata.no/NL/lov/2006-06-16-20/%C2%A714a"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('registrering-arbeidssoker.argument-liste1-lenke')}
                                        </a>
                                    </li>
                                    <li>
                                        {t('registrering-arbeidssoker.argument2-liste1-del2')}
                                    </li>
                                </ul>
                            </Normaltekst>
                        </div>
                        <div className="rad2__boks rad2__plikter">
                            <img className="rad__ikon" src={infobilde} alt="Plikter" />
                            <Undertittel tag="h2" className="rad__tittel plikter__tittel">
                                {t('registrering-arbeidssoker.argument2tittel2')}
                            </Undertittel>
                            <Normaltekst tag="div">
                                <ul>
                                    <li>
                                        {t('registrering-arbeidssoker.argument2-liste2-del1')}
                                    </li>
                                    <li>
                                        {t('registrering-arbeidssoker.argument2-liste2-del2')}
                                    </li>
                                </ul>
                            </Normaltekst>
                        </div>
                    </div>
                </div >
            );
        };

        const Rad3 = () => {
            return (
                <div className="registrering-arbeidssoker__rad3">
                    <Innholdstittel
                        tag="h2"
                        className="rad__tittel rad3__tittel"
                    >
                        {t('registrering-arbeidssoker.argument3tittel')}
                    </Innholdstittel>
                    <div className="rad3__tekst">
                        <Normaltekst>
                            {t('registrering-arbeidssoker.rad3.del1')}
                        </Normaltekst>
                        <ul className="typo-normal">
                            <li>{t('registrering-arbeidssoker.rad3.punkt1')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt2')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt3')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt4')}</li>
                        </ul>
                        <Normaltekst>
                            {t('registrering-arbeidssoker.rad3.del2-1')}
                            <br />
                            {t('registrering-arbeidssoker.rad3.del2-2')}
                        </Normaltekst>
                        <Element tag="h3">
                            {t('registrering-arbeidssoker.rad3.del4.tittel')}
                        </Element>
                        <Normaltekst>
                            {t('registrering-arbeidssoker.rad3.del4.innhold')}
                            <br />
                            {t('registrering-arbeidssoker.rad3.del4.lesmer')}
                            <a className="lenke" href="https://www.nav.no/personvern">
                                {t('registrering-arbeidssoker.rad3.del4.lenke')}
                            </a>
                        </Normaltekst>
                    </div>
                    <Normaltekst tag="div" className="rad3__tips">
                        <strong>{t('registrering-arbiedssoker.tipstekst-del1')} </strong>
                        {t('registrering-arbiedssoker.tipstekst-del2')}
                    </Normaltekst>

                    <div className="rad3__knapperad">
                        <KnappBase
                            type="hoved"
                            onClick={() => this.props.history.push(`${SKJEMA_PATH}/0`)}
                            data-testid="start-registrering"
                        >
                            {t('registrering-arbeidssoker-knapp')}
                        </KnappBase>
                    </div>
                </div>
            );
        };

        const rader = [
            <Rad1 key={1} />,
            <Rad2 key={2} />,
            <Rad3 key={3} />
        ];

        return (
            <div className="registrering-arbeidssoker" >
                <div className="banner">
                    <Sidetittel>
                        {t('registrering-arbeidssoker.tittel')}
                    </Sidetittel>
                </div>
                {rader}
            </div>
        );

    }

}

const mapStateToProps = (state: AppState) => ({
    featureToggles: selectFeatureToggles(state)
});

export default connect(mapStateToProps)(withTranslation()(RegistreringArbeidssoker));
