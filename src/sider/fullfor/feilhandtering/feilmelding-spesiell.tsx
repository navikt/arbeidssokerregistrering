import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import ResponsivSide from '../../../komponenter/side/responsiv-side';
import Feilmelding from './feilmelding/feilmelding';
// import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';

class FeilmeldingSpesiell extends React.Component<InjectedIntlProps> {
    render() {
        const messages = this.props.intl.messages;
        return (
            <ResponsivSide>
                <div className="feilhandtering">
                    <Feilmelding>
                        <div>
                            <Normaltekst className="blokk-s">
                                {messages['feilhandtering-overtekst']}
                            </Normaltekst>
                            <Normaltekst>
                                <span dangerouslySetInnerHTML={{__html: messages['feilhandtering-undertekst']}}/>
                            </Normaltekst>
                        </div>
                    </Feilmelding>
                </div>
            </ResponsivSide>
        );
    }
}

export default injectIntl(FeilmeldingSpesiell);