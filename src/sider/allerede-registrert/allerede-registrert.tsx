import * as React from 'react';
import { Column, Container, Row } from 'nav-frontend-grid';
import Innholdstittel from 'nav-frontend-typografi/lib/innholdstittel';
import { Normaltekst } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';

interface Props {

}

class AlleredeRegistrert extends React.Component<Props> {
    render() {
        return (
            <Container className="allerede-registrert">
                <GraaBakgrunn />
                <Row>
                    <Column xs="12">
                        <Innholdstittel tag="h1" className="allerede-registrert__tittel">
                            Du er allerede registrert hos NAV
                        </Innholdstittel>
                        <Normaltekst className="allerede-registrert__undertittel">
                            Hva nå?
                        </Normaltekst>
                    </Column>
                </Row>
                <Row>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            <Normaltekst className="allerede-registrert__boks-tekst">
                                Du kan fortsette med Aktivitetsplanen.
                            </Normaltekst>
                            <a href="www.nav.no" className="allerede-registrert__knapp knapp">Aktivitetsplan</a>
                        </div>
                    </Column>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            <Normaltekst className="allerede-registrert__boks-tekst">
                                Du kan finne informasjon i Veien til arbeid.
                            </Normaltekst>
                            <a href="www.nav.no" className="allerede-registrert__knapp knapp">Veien til arbeid</a>
                        </div>
                    </Column>
                    <Column xs="12" sm="4" className="allerede-registrert__boks">
                        <div className="allerede-registrert__boks-innhold">
                            <Normaltekst className="allerede-registrert__boks-tekst">
                                Du kan kontakte ditt lokale NAV-kontor.
                            </Normaltekst>
                            <a href="www.nav.no" className="allerede-registrert__knapp knapp">Dialog</a>
                        </div>
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default AlleredeRegistrert;