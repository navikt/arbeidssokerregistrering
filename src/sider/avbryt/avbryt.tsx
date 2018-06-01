import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import KnappBase from 'nav-frontend-knapper';
import { MatchProps } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import Lukknapp from 'nav-frontend-lukknapp';
import { DITTNAV_URL } from '../../ducks/api';
import { Container, Column, Row } from 'nav-frontend-grid';

type Props = RouteComponentProps<MatchProps>;

const avbrytSvg = require('./avbryt.svg');

function Avbryt({history}: Props) {
    return (
        <Container className="avbryt-panel-wrapper">
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
                            onClick={() => document.location.href = DITTNAV_URL}
                        >
                            <FormattedMessage id="knapp-ja-avbryt"/>
                        </KnappBase>
                        <KnappBase type="standard" onClick={() => history.goBack()}>
                            <FormattedMessage id="knapp-nei"/>
                        </KnappBase>
                    </div>
                </Column>
            </Row>
        </Container>
    );
}

export default Avbryt;