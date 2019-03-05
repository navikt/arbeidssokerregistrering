import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import './startside-registrering-sykemeldt-fss.less';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import aktplanbilde from './aktivitetsplan-ill.svg';
import { MatchProps } from '../../utils/utils';
import { INNGANGSSPORSMAL_PATH } from '../../utils/konstanter';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import { frontendLogger } from '../../metrikker/metrics-utils';

type RegistreringArbeidssokerProps = RouteComponentProps<MatchProps>;

class StartsideRegistreringSykemeldtFss extends React.Component<RegistreringArbeidssokerProps> {

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
                                id="registrering-sykemeldt.argument1tekst-fss"
                                tagName="ul"
                            />
                        </Normaltekst>
                    </div>
                    <img className="rad1__ikon" src={aktplanbilde} alt="Arbeidssøker-ikon" />
                </div>
            </div>
        );
    }

    Rad2 = () => {
        return (
            <div className="registrering-sykemeldt__rad2 rad-even">
                <div className="registrering-sykemeldt-tekst__rad2">
                    <Innholdstittel tag="h2" className="rad__tittel">
                        <FormattedMessage id="registrering-sykemeldt-rad2-tittle-fss"/>
                    </Innholdstittel>
                    <Normaltekst>
                        <FormattedMessage id="registrering-sykemeldt-rad2-tekst1-fss"/>&nbsp;&nbsp;
                        <a className="lenke" href="https://www.nav.no/personvern">
                            <FormattedMessage id="registrering.personopplysninger.lenke"/>
                        </a>
                    </Normaltekst>

                    <Normaltekst>
                        <Element tag="h3">
                            <FormattedMessage id="registrering-arbeidssoker-rad2-del2-tittel-fss"/>
                        </Element>
                        <FormattedMessage id="registrering-sykemeldt-rad2-teskt2-tittel-fss"/>{' '}
                        <a
                            className="lenke"
                            href="https://arbeidsplassen.nav.no"
                            onClick={() => {
                                frontendLogger('veiledearbeidssoker.klikkpaarbeidsplassenlenke');
                            }}
                        >
                            <FormattedMessage id="registrering.arbeidsplassen.lenke"/>
                        </a>{'. '}
                        <FormattedMessage id="registrering-sykemeldt-rad2-tekst2-fss"/>
                    </Normaltekst>
                </div>
            </div>
        );
    }

    Rad3 = () => {
        return(
            <div>
                <div className="rad3__knapperad">
                    <KnappBase
                        type="hoved"
                        onClick={() => this.props.history.push(INNGANGSSPORSMAL_PATH)}
                        data-testid="start-registrering-sykemeldt-fss"
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
            <div className="registrering-sykemeldt-fss">
                <this.Rad1/>
                <this.Rad2/>
                <this.Rad3/>
            </div>
        );
    }
}

export default StartsideRegistreringSykemeldtFss;
