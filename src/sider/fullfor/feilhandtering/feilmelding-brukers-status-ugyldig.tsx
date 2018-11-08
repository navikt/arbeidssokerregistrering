import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import ResponsivSide from '../../../komponenter/side/responsiv-side';
import Feilmelding from '../../../komponenter/feilmelding/feilmelding';
import { ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';

import './feilmelding-brukers-status-ugyldig.less';

interface IntlPropsWithFeilType extends InjectedIntlProps {
    feilType: string;
}

class FeilmeldingBrukersStatusUgyldig extends React.Component<IntlPropsWithFeilType> {
    intl: ReactIntl.InjectedIntl;
    feilType: string;
    private messageKey: string;
    constructor(props: IntlPropsWithFeilType) {
        super (props);
        this.feilType = props.feilType;
    }

    render() {
        const messages = this.props.intl.messages;
        switch (this.feilType) {
            case (FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE): {
                this.messageKey = 'feilhandtering-mangler-arb-tillatelse-overtekst';
                break;
            }
            case (FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET): {
                this.messageKey = 'feilhandtering-utvandret-overtekst';
                break;
            }
            default: {
                this.messageKey = 'feilhandtering-overtekst';
            }
        }
        return (
            <ResponsivSide>
                <div className="feilhandtering">
                    <Feilmelding>
                        <div>
                            <Normaltekst className="blokk-s">
                                {messages[this.messageKey]}
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

export default injectIntl(FeilmeldingBrukersStatusUgyldig);
