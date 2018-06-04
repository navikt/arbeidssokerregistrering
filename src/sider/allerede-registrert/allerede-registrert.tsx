import * as React from 'react';
import { Column, Container, Row } from 'nav-frontend-grid';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';

interface Props {

}

class AlleredeRegistrert extends React.Component<Props> {
    render() {
        return (
            <Container className="allerede-registrert">
                <Row>
                    <Column xs="12" className="allerede-registrert__tittel">
                        <Innholdstittel tag="h1">
                            Du er allerede registrert
                        </Innholdstittel>
                    </Column>
                </Row>
                <Row>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            Gå hit?
                        </div>
                    </Column>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            Gå hit?
                        </div>
                    </Column>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            Gå hit?
                        </div>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default AlleredeRegistrert;