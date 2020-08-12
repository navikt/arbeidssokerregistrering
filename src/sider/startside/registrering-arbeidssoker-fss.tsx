import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Element, Innholdstittel, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import aktplanbilde from './aktivitetsplan-ill.svg';
import paragrafbilde from './paragraf.svg';
import infobilde from './info.svg';
import { MatchProps } from '../../utils/utils';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { withTranslation, WithTranslation } from 'react-i18next'
import './registrering-arbeidssoker.less';


class RegistreringArbeidssokerFss extends React.Component<RouteComponentProps<MatchProps> & WithTranslation> {

    Rad1 = () => {
        const { t } = this.props;

        return (
            <div className="registrering-arbeidssoker__rad1">
                <Innholdstittel tag="h2" className="rad__tittel">
                    {t('registrering-arbeidssoker.introtittel')}
                </Innholdstittel>
                <div className="rad1__innhold">
                    <div className="rad1__innhold__tekst">
                        <Normaltekst tag="div">
                            <ul>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del1-fss')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del2-fss')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del3-fss')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del4-fss')}
                                </li>
                                <li>
                                    {t('registrering-arbeidssoker.argument1-liste-del5-fss')}
                                </li>
                            </ul>
                        </Normaltekst>
                    </div>
                    <div>
                        <img className="rad1__ikon" src={aktplanbilde} alt="Arbeidssøker-ikon" />
                    </div>
                </div>
            </div>
        );
    }

    Rad2 = () => {
        const { t } = this.props;

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
            </div>
        );
    }

    Rad3 = () => {
        const { t } = this.props;

        return (
            <div className="registrering-arbeidssoker__rad3">
                <Innholdstittel
                    tag="h2"
                    className="rad__tittel"
                >
                    {t('registrering-arbeidssoker.argument3tittel-fss')}
                </Innholdstittel>
                <div className="rad3__tekst">
                    <Normaltekst>
                        {t('registrering-arbeidssoker.rad3.del1-fss')}
                    </Normaltekst>
                    <Normaltekst>
                        <ul className="typo-normal">
                            <li>{t('registrering-arbeidssoker.rad3.punkt1-fss')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt2-fss')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt3-fss')}</li>
                            <li>{t('registrering-arbeidssoker.rad3.punkt4-fss')}</li>
                        </ul>
                    </Normaltekst>
                    <Normaltekst className="blokk-l" tag="div">
                        {t('registrering-arbeidssoker.rad3.del2-fss')}
                    </Normaltekst>
                    <Element tag="h3">
                        {t('registrering-arbeidssoker.rad3.del3-tittel-fss')}
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        {t('registrering-arbeidssoker.rad3.del3-innhold-1-fss')}
                        <a className="lenke"
                            href="https://lovdata.no/NL/lov/2006-06-16-20/%C2%A714a"
                        >
                            {t('registrering-arbeidssoker.rad3.del3-innhold-lenke-fss')}
                        </a>
                        {t('registrering-arbeidssoker.rad3.del3-innhold-2-fss')}
                    </Normaltekst>

                    <Element tag="h3">
                        {t('registrering-arbeidssoker.rad3.del4-tittel-fss')}
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        {t('registrering-arbeidssoker.rad3.del4-innhold-fss')}
                        <a href="https://www.nav.no/personvern"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t('registrering-arbeidssoker.rad3.del4-innhold-lenke-fss')}
                        </a>
                    </Normaltekst>

                    <Normaltekst className="registrering-arbeidssoker__rad3--tips" tag="div">
                        <strong>{t('registrering-arbiedssoker.tipstekst-del1-fss')} </strong>
                        {t('registrering-arbiedssoker.tipstekst-del2-fss')}
                    </Normaltekst>
                </div>
            </div>
        );
    }

    Rad4 = () => {
        const { t } = this.props;

        return (
            <>
                <div className="rad4__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(`${SKJEMA_PATH}/0`)}
                        data-testid="start-arbeidssoker-registrering-fss"
                    >
                        {t('registrering-arbeidssoker-knapp-fss')}
                    </KnappBase>
                </div>
                <LenkeAvbryt />
            </>
        );
    }

    render() {
        const { t } = this.props;

        return (
            <div className="registrering-arbeidssoker">
                <div className="registrering-banner">
                    <Systemtittel>
                        {t('registrering-arbeidssoker.tittel')}
                    </Systemtittel>
                </div>
                <this.Rad1 />
                <this.Rad2 />
                <this.Rad3 />
                <this.Rad4 />
            </div>
        );

    }

}

export default withTranslation()(RegistreringArbeidssokerFss);
