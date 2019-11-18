import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { VEILARBSTEPUP } from '../../ducks/api';
import './stepup.less';
import { InjectedIntlProps } from 'react-intl';
import bankidSvg from './bankid.svg';
import navKontorSvg from './nav-kontor.svg';
import InfoKort from '../info-kort/info-kort';

const StepUp: React.SFC<InjectedIntlProps> = (props: InjectedIntlProps) => {
    return (
        <section className="stepup">
            <div className="limit stepup__login">
                <Systemtittel className="tittel">
                    <FormattedMessage id="overskrift-stepup"/>
                </Systemtittel>
                <Normaltekst className="beskrivelse"><FormattedMessage id="stepup-melding"/></Normaltekst>
                <div className="knapper-vertikalt">
                    <a
                        className="knapp knapp--hoved stepup__knapp"
                        href={VEILARBSTEPUP}
                    >
                        <Normaltekst>
                            <FormattedHTMLMessage id="knapp-logg-inn"/>
                        </Normaltekst>
                    </a>
                </div>
            </div>
            <div className="stepup__hjelp">
                <div className="stepup__hjelp__innhold limit">
                    <Systemtittel className="tittel">
                        <FormattedMessage id="overskrift-hjelp-stepup"/>
                    </Systemtittel>
                    <div className="stepup__hjelp__kort">
                        <InfoKort
                            bilde={bankidSvg}
                            bildeBeskrivelse="BankID illustrasjon"
                            tittel="overskrift-elektronisk-hjelp-stepup"
                            beskrivelse="beskrivelse-elektronisk-hjelp-stepup"
                            lenke="https://eid.difi.no/nb/bankid"
                            lenkeTarget="_blank"
                            lenkeTekst="overskrift-elektronisk-hjelp-stepup"
                        />
                        <InfoKort
                            bilde={navKontorSvg}
                            bildeBeskrivelse="NAV-kontor illustrasjon"
                            tittel="overskrift-manuell-hjelp-stepup"
                            beskrivelse="beskrivelse-manuell-hjelp-stepup"
                            lenke="https://tjenester.nav.no/nav-sok"
                            lenkeTekst="manuell-hjelp-lenketekst"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepUp;
