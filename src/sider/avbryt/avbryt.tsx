import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Container, Column, Row } from 'nav-frontend-grid';
import { MatchProps } from '../../utils/utils';
import { DITT_NAV_URL } from '../../ducks/api';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';

import avbrytSvg from './avbryt.svg';
import './avbryt.less';

type Props = RouteComponentProps<MatchProps>;

function Avbryt({history}: Props) {
    return (
        <Container className="avbryt-panel-wrapper">
            <GraaBakgrunn />
            <Row className="avbryt-panel__lukkknapperad">
                <Lukknapp onClick={() => history.goBack()}>
                    Lukk
                </Lukknapp>
            </Row>
            <Row className="avbryt-panel">
                <Column sm="3">
                    <img src={avbrytSvg} alt="Avsjekk" className="avbryt-panel__illustrasjon"/>
                </Column>
                <Column sm="9" xs="12">
                    <Innholdstittel className="avbryt-panel__tittel">
                        <FormattedMessage id="beskrivelse-avbryt"/>
                    </Innholdstittel>
                    <div className="avbryt-panel__knapperad">
                        <KnappBase
                            type="standard"
                            onClick={() => document.location!.href = DITT_NAV_URL}
                        >
                            <FormattedMessage id="knapp-ja-avbryt"/>
                        </KnappBase>
                        <KnappBase
                            type="standard"
                            onClick={() => history.goBack()}
                        >
                            <FormattedMessage id="knapp-nei"/>
                        </KnappBase>
                    </div>
                </Column>
            </Row>
        </Container>
    );
}

export default Avbryt;
