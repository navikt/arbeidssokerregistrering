import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';
import Lukknapp from 'nav-frontend-lukknapp';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Container, Column, Row } from 'nav-frontend-grid';
import { MatchProps } from '../../utils/utils';
import { DITT_NAV_URL } from '../../utils/konstanter';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import { withTranslation, WithTranslation } from 'react-i18next'

import avbrytSvg from './avbryt.svg';
import './avbryt.less';

type Props = RouteComponentProps<MatchProps> & WithTranslation;

function Avbryt({ history, t }: Props) {
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
                    <img src={avbrytSvg} alt="Avsjekk" className="avbryt-panel__illustrasjon" />
                </Column>
                <Column sm="9" xs="12">
                    <Innholdstittel className="avbryt-panel__tittel">
                        {t('beskrivelse-avbryt')}
                    </Innholdstittel>
                    <div className="avbryt-panel__knapperad">
                        <KnappBase
                            type="standard"
                            onClick={() => document.location!.href = DITT_NAV_URL}
                        >
                            {t('knapp-ja-avbryt')}
                        </KnappBase>
                        <KnappBase
                            type="standard"
                            onClick={() => history.goBack()}
                        >
                            {t('knapp-nei')}
                        </KnappBase>
                    </div>
                </Column>
            </Row>
        </Container>
    );
}

export default withTranslation()(Avbryt);
