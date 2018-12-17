import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Normaltekst, Undertittel, Systemtittel } from 'nav-frontend-typografi';
import { VEILARBSTEPUP } from '../../ducks/api';
import './stepup.less';
import { InjectedIntlProps } from 'react-intl';
import { HoyreChevron } from 'nav-frontend-chevron';
import bankidSvg from './bankid.svg';
import navKontorSvg from './nav-kontor.svg';

const StepUp: React.SFC<InjectedIntlProps> = (props: InjectedIntlProps ) => {
    const navKontorLenke = props.intl.messages['finn-ditt-nav-kontor-lenke-url'];
    return (
        <section className="stepup">
            <div className="limit stepup__login">
                <Systemtittel className="tittel">
                    <FormattedMessage id="overskrift-stepup"/>
                </Systemtittel>
                <Normaltekst className="beskrivelse"><FormattedMessage id="stepup-melding"/></Normaltekst>
                <div className="knapper-vertikalt">
                    <button
                        className="knapp knapp--hoved stepup__knapp"
                        onClick={() => window.location.href = VEILARBSTEPUP}
                    >
                        <Normaltekst>
                            <FormattedHTMLMessage id="knapp-logg-inn"/>
                        </Normaltekst>
                    </button>
                </div>
            </div>
            <div className="stepup__hjelp">
                <div className="limit">
                <Systemtittel className="tittel">
                    <FormattedMessage id="overskrift-hjelp-stepup"/>
                </Systemtittel>
                <div className="stepup__hjelp__informasjon">
                    <div>
                        <img src={bankidSvg} alt={'BankID'}/>
                        <Undertittel><FormattedMessage id="overskrift-elektronisk-hjelp-stepup"/></Undertittel>
                        <Normaltekst className="beskrivelse">
                            <FormattedMessage id="beskrivelse-elektronisk-hjelp-stepup"/>
                        </Normaltekst>
                        <a
                            className="hjelp-lenke typo-element"
                            href="https://eid.difi.no/nb/bankid"
                            target="_blank"
                        >
                            Skaff deg elektronisk ID
                        </a>
                        <HoyreChevron/>
                    </div>
                    <div>
                        <img src={navKontorSvg} alt={'NAV-kontor'}/>
                        <Undertittel><FormattedMessage id="overskrift-manuell-hjelp-stepup"/></Undertittel>
                        <Normaltekst className="beskrivelse">
                            <FormattedMessage id="beskrivelse-manuell-hjelp-stepup"/>
                        </Normaltekst>
                        <a
                            className="hjelp-lenke typo-element"
                            href={navKontorLenke}
                            target="_blank"
                        >
                            Finn ditt lokale NAV-kontor
                        </a>
                        <HoyreChevron/>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default StepUp;
