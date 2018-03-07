import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { MatchProps } from '../skjema/skjema';
import PanelBlokk from '../../komponenter/panel-blokk/panel-blokk';
import PanelBlokkGruppe from '../../komponenter/panel-blokk/panel-blokk-gruppe';
import KnappNeste from '../../komponenter/knapper/knapp-neste';
import { selectInnloggingsinfo, State as InnloggingsInfoState } from '../../ducks/innloggingsinfo';
import { AppState } from '../../reducer';
import { hentFornavn } from '../../utils/utils';
import { AVBRYT_PATH, DINSITUASJON_PATH } from '../../utils/konstanter';

interface StateProps {
    innloggingsInfo: InnloggingsInfoState;
}

type StartProps = StateProps & null;

export class Start extends React.Component<RouteComponentProps<MatchProps> & StartProps> {
    render () {
        const { history, innloggingsInfo } = this.props;
        const { name } = innloggingsInfo.data;
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
                                <FormattedMessage id="knapp-avbryt"/>
                            </Normaltekst>
                        </Knapp>,
                        <KnappNeste
                            key="2"
                            className="mml"
                            onClick={(() => {
                                history.push(DINSITUASJON_PATH);
                            })}
                        />
                    ]
                }
            >
                <PanelBlokk
                    tittelId="overskrift-start"
                    tittelVerdier={{fornavn: hentFornavn(name)}}
                    tittelCssNavnVariant="bla-variant"
                    beskrivelseId="beskrivelse-start"
                />
            </PanelBlokkGruppe>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    innloggingsInfo: selectInnloggingsinfo(state)
});

export default connect(mapStateToProps, null)(Start);
