import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Banner from '../../komponenter/banner/banner';
import { DITTNAV_URL } from '../../ducks/api';

const handinfoSvg = require('./handinfo.svg');

type Props = InjectedIntlProps;

class KreverReaktivering extends React.Component<Props> {
    render() {
        return (
            <>
            <Banner />
            <div className="limit">
                <section className="krever-reaktivering">
                    <Innholdstittel className="krever-reaktivering__tittel">
                        <FormattedMessage id="krever-reaktivering-tittel"/>
                    </Innholdstittel>
                    <div className="krever-reaktivering__infopanel">
                        <div className="krever-reaktivering__handinfo-ikon">
                            <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon"/>
                        </div>
                        <div className="krever-reaktivering__tekster">
                            <Normaltekst>
                                <FormattedMessage id="krever-reaktivering-boks-tekst"/>
                            </Normaltekst>
                        </div>
                    </div>
                    <div className="krever-reaktivering__aksjonspanel">
                        <Normaltekst>
                            <FormattedMessage id="krever-reaktivering-undertittel"/>
                        </Normaltekst>
                        <div className={'knapper-vertikalt'}>
                            <a href="/" className="knapp knapp--hoved">
                                <FormattedMessage id="Ja"/>
                            </a>
                            <a href={DITTNAV_URL} className="lenke-avbryt typo-element">
                                <FormattedMessage id="avbryt-lenke" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            </>
        );
    }
}

export default injectIntl(KreverReaktivering);