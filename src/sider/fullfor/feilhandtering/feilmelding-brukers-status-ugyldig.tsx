import * as React from 'react';
import { InjectedIntlProps, InjectedIntl, injectIntl } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import Feilmelding from '../../../komponenter/feilmelding/feilmelding';
import { ErrorTypes as FullforErrorTypes } from '../../../ducks/registrerbruker';
import { uniLogger } from '../../../metrikker/uni-logger';
import './feilmelding-brukers-status-ugyldig.less';
import FeilmeldingManglerArbeidstillatelse
    from '../../../komponenter/feilmelding/feilmelding-mangler-arbeidstillatelse';

interface FeilmeldingBrukersStatusUgyldigProps {
    feilType: FullforErrorTypes;
}

type AllProps = InjectedIntlProps & FeilmeldingBrukersStatusUgyldigProps;

class FeilmeldingBrukersStatusUgyldig extends React.Component<AllProps> {

    lagFeilmelding(feilType: FullforErrorTypes, intl: InjectedIntl) {

        const { messages } = intl;
        let feilmelding;

        if (feilType === FullforErrorTypes.BRUKER_MANGLER_ARBEIDSTILLATELSE) {
            feilmelding = <FeilmeldingManglerArbeidstillatelse intl={this.props.intl} />;
        } else {

            let messageKey;

            if (feilType === FullforErrorTypes.BRUKER_ER_DOD_UTVANDRET_ELLER_FORSVUNNET) {
                messageKey = 'feilhandtering-utvandret-overtekst';
            } else {
                messageKey = 'feilhandtering-overtekst';
            }

            feilmelding = (
                <Feilmelding>
                    <div>
                        <Normaltekst className="blokk-s">
                            {messages[messageKey]}
                        </Normaltekst>
                        <Normaltekst>
                            <span dangerouslySetInnerHTML={{__html: messages['feilhandtering-undertekst']}}/>
                        </Normaltekst>
                    </div>
                </Feilmelding>
            );

        }

        return feilmelding;
    }

    render() {
        const { feilType, intl } = this.props;
        const feilmelding = this.lagFeilmelding(feilType, intl);
        uniLogger('arbeidssokerregistrering.error', { feilType: feilType })

        return (
            <div className="feilhandtering">
                {feilmelding}
            </div>
        );

    }
}

export default injectIntl(FeilmeldingBrukersStatusUgyldig);
