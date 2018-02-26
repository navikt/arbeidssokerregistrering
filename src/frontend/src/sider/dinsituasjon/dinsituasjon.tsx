import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import { AVBRYT_PATH, SKJEMA_PATH } from '../../utils/konstanter';
import { getIntlMessage } from '../../utils/utils';

type DinSituasjonProps = RouteComponentProps<MatchProps> & InjectedIntlProps;

export class DinSituasjon extends React.PureComponent<DinSituasjonProps> {
    render () {
        const { history, intl } = this.props;
        return (
            <PanelBlokkGruppe
                knappAksjoner={
                    [
                        <Knapp
                            key="1"
                            type="standard"
                            className="knapp"
                            onClick={() => history.push(`${AVBRYT_PATH}`)}
                        >
                            <Normaltekst>
                                {getIntlMessage(intl.messages, 'knapp-avbryt')}
                            </Normaltekst>
                        </Knapp>,
                        <KnappNeste
                            key="2"
                            className="mml"
                            onClick={(() => {
                                history.push(`${SKJEMA_PATH}/1`);
                            })}
                        />
                    ]
                }
            >
                <PanelBlokk
                    tittelId="dinsituasjon-header"
                    beskrivelseId="dinsituasjon-ingress"
                >
                    <ul className="typo-normal blokk pml mmt">
                        <li>{getIntlMessage(intl.messages, 'dinsituasjon-liste-1')}</li>
                        <li>{getIntlMessage(intl.messages, 'dinsituasjon-liste-2')}</li>
                    </ul>
                </PanelBlokk>

            </PanelBlokkGruppe>
        );
    }
}

export default injectIntl(DinSituasjon);
