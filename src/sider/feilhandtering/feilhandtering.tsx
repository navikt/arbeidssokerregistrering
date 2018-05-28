import { AlertStripeNavAnsatt } from 'nav-frontend-alertstriper';
import * as React from 'react';
import ResponsivSide from '../../komponenter/side/responsiv-side';
import { Normaltekst } from 'nav-frontend-typografi';
import { InjectedIntlProps, injectIntl } from 'react-intl';

class Feilhandtering extends React.Component<InjectedIntlProps> {
    render() {
        const messages = this.props.intl.messages;
        return (
            <ResponsivSide>
                <div className="feilhandtering">
                    <AlertStripeNavAnsatt>
                        <div>
                            <Normaltekst className="blokk-s">
                                {messages['feilhandtering-overtekst']}
                            </Normaltekst>
                            <Normaltekst>
                                <span dangerouslySetInnerHTML={{__html: messages['feilhandtering-undertekst']}}/>
                            </Normaltekst>
                        </div>
                    </AlertStripeNavAnsatt>
                </div>
            </ResponsivSide>
        );
    }
}

export default injectIntl(Feilhandtering);