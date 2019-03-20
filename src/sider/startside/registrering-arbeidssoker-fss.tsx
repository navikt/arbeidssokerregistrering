import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Element, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import aktplanbilde from './aktivitetsplan-ill.svg';
import paragrafbilde from './paragraf.svg';
import infobilde from './info.svg';
import { MatchProps } from '../../utils/utils';
import { SKJEMA_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import './registrering-arbeidssoker.less';

class RegistreringArbeidssokerFss extends React.Component<RouteComponentProps<MatchProps>> {

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
                    <Normaltekst>
                        <FormattedHTMLMessage id="registrering-arbeidssoker.rad3.opplysninger-fss"/>
                    </Normaltekst>
                    <Normaltekst className="blokk-l" tag="div">
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del2-fss"/>
                    </Normaltekst>

                    <Element tag="h3">
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del3-tittel-fss"/>
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        <FormattedHTMLMessage id="registrering-arbeidssoker.rad3.del3-innhold-fss"/>
                    </Normaltekst>

                    <Element tag="h3">
                        <FormattedMessage id="registrering-arbeidssoker.rad3.del4-tittel-fss"/>
                    </Element>
                    <Normaltekst className="blokk-l" tag="div">
                        <FormattedHTMLMessage id="registrering-arbeidssoker.rad3.del4-innhold-fss"/>
                    </Normaltekst>

                    <Normaltekst className="registrering-arbeidssoker__rad3--tips" tag="div">
                        <FormattedHTMLMessage id="registrering-arbeidssoker.rad3.tips-fss"/>
                    </Normaltekst>
                </div>
            </div>
        );
    }

    Rad4 = () => {
        return(
            <>
                <div className="rad4__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(`${SKJEMA_PATH}/0`)}
                        data-testid="start-arbeidssoker-registrering-fss"
                    >
                        <FormattedMessage id="registrering-arbeidssoker-knapp-fss"/>
                    </KnappBase>
                </div>
                <LenkeAvbryt />
            </>
        );
    }

    render() {

        return (
            <div className="registrering-arbeidssoker">
                <this.Rad1/>
                <this.Rad2/>
                <this.Rad3/>
                <this.Rad4/>
            </div>
        );

    }

}

export default RegistreringArbeidssokerFss;
