import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { MatchProps } from '../../utils/utils';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import { SKJEMA_PATH } from '../../utils/konstanter';
import { getIntlMessage } from '../../utils/utils';
import Knappervertikalt from '../../komponenter/knapper/knapper-vertikalt';
import LenkeAvbryt from '../../komponenter/knapper/lenke-avbryt';
import ResponsivSide from '../../komponenter/side/responsiv-side';

type DinSituasjonProps = RouteComponentProps<MatchProps> & InjectedIntlProps;

export class DinSituasjon extends React.PureComponent<DinSituasjonProps> {
    render() {
        const {history, intl} = this.props;
        return (
            <ResponsivSide className="din-situasjon">
                <Innholdstittel className="tittel">
                    <FormattedMessage id="dinsituasjon-header"/>
                </Innholdstittel>
                <Normaltekst className="beskrivelse"><FormattedMessage id="dinsituasjon-ingress"/></Normaltekst>
                <ul className="liste typo-normal">
                    <li className="din-situasjon-list">{getIntlMessage(intl.messages, 'dinsituasjon-liste-1')}</li>
                    <li className="din-situasjon-list">{getIntlMessage(intl.messages, 'dinsituasjon-liste-2')}</li>
                </ul>

                <Knappervertikalt>
                    <KnappNeste
                        className="mml"
                        onClick={(() => {
                            history.push(`${SKJEMA_PATH}/0`);
                        })}
                    />
                    <LenkeAvbryt/>
                </Knappervertikalt>
            </ResponsivSide>
        );
    }
}

export default injectIntl(DinSituasjon);
