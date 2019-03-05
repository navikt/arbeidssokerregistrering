import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import './registrering-arbeidssoker-fss.less';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import aktplanbilde from './aktivitetsplan-ill.svg';
import paragrafbilde from './paragraf.svg';
import infobilde from './info.svg';
import { MatchProps } from '../../utils/utils';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';

type RegistreringArbeidssokerProps =  RouteComponentProps<MatchProps>;

class RegistreringArbeidssokerFss extends React.Component<RegistreringArbeidssokerProps> {

    Rad1 = () => {
        return (
            <div className="registrering-arbeidssoker__rad1">
                <Innholdstittel tag="h2" className="rad__tittel">
                    <FormattedMessage id="registrering-arbeidssoker.introtittel"/>
                </Innholdstittel>
                <div className="rad1__innhold">
                    <div className="rad1__innhold__tekst">
                        <Normaltekst tag="div">
                            <FormattedHTMLMessage
                                id="registrering-arbeidssoker.argument1tekst-fss"
                                tagName="ul"
                            />
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
        return (
            <div className="registrering-arbeidssoker__rad2 rad-even">
                <div className="rad2-wrapper">
                    <div className="rad2__boks rad2__rettigheter">
                        <img className="rad__ikon" src={paragrafbilde} alt="Rettigheter"/>
                        <Undertittel tag="h2" className="rad__tittel rettigheter__tittel">
                            <FormattedMessage id="registrering-arbeidssoker.argument2tittel1"/>
                        </Undertittel>
                        <Normaltekst tag="div">
                            <FormattedHTMLMessage id="registrering-arbeidssoker.argument2tekst1-fss"/>
                        </Normaltekst>
                    </div>
                    <div className="rad2__boks rad2__plikter">
                        <img className="rad__ikon" src={infobilde} alt="Plikter"/>
                        <Undertittel tag="h2" className="rad__tittel plikter__tittel">
                            <FormattedMessage id="registrering-arbeidssoker.argument2tittel2"/>
                        </Undertittel>
                        <Normaltekst tag="div">
                            <FormattedHTMLMessage id="registrering-arbeidssoker.argument2tekst2-fss"/>
                        </Normaltekst>
                    </div>
                </div>
            </div>
        );
    }

    Rad3 = () => {
        return (
            <div className="registrering-arbeidssoker__rad3">
                <Innholdstittel
                    tag="h2"
                    className="rad__tittel"
                >
                    <FormattedMessage id="registrering-arbeidssoker.argument3tittel-fss"/>
                </Innholdstittel>
                <div className="rad3__tekst">
                    <Normaltekst>
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del1-fss"/>
                    </Normaltekst>
                    <ul className="typo-normal">
                        <li><FormattedMessage id="registrering-arbeidssoker.rad3.punkt1-fss"/></li>
                        <li><FormattedMessage id="registrering-arbeidssoker.rad3.punkt2-fss"/></li>
                        <li><FormattedMessage id="registrering-arbeidssoker.rad3.punkt3-fss"/></li>
                        <li><FormattedMessage id="registrering-arbeidssoker.rad3.punkt4-fss"/></li>
                        <li><FormattedMessage id="registrering-arbeidssoker.rad3.punkt5-fss"/></li>
                    </ul>
                    <Normaltekst>
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del2-fss"/>
                    </Normaltekst>

                    <Normaltekst>
                        <a className="lenke" href="https://www.nav.no/personvern">
                            <FormattedMessage id="registrering.personopplysninger.lenke"/>
                        </a>&nbsp;
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del4.innhold-fss"/><br/>
                    </Normaltekst>
                </div>
            </div>
        );
    }

    Rad4 = () => {
        return(
            <div>
                <div className="rad4__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(`${SKJEMA_PATH}/0`)}
                        data-testid="start-arbeidssoker-registrering-fss"
                    >
                        <FormattedMessage id="startside-arbeidssoker-fss-knapp"/>
                    </KnappBase>
                </div>
                <LenkeAvbryt />
            </div>
        );
    }
    
    render() {

        return (
            <div className="registrering-arbeidssoker-fss">
                <this.Rad1/>
                <this.Rad2/>
                <this.Rad3/>
                <this.Rad4/>
            </div>
        );

    }

}

export default RegistreringArbeidssokerFss;
