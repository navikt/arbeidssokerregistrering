import * as React from 'react';
import { Column, Container, Row } from 'nav-frontend-grid';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';

import './allerede-registrert.less';

type Props = InjectedIntlProps;

class AlleredeRegistrert extends React.Component<Props> {
    render() {
        const messages = this.props.intl.messages;
        return (
            <div>
                <Banner />
                <Container className="allerede-registrert">
                    <GraaBakgrunn />
                    <Row>
                        <Column xs="12">
                            <Innholdstittel tag="h1" className="allerede-registrert__tittel">
                                {messages['allerede-registrert-tittel']}
                            </Innholdstittel>
                            <Normaltekst className="allerede-registrert__undertittel">
                                {messages['allerede-registrert-undertittel']}
                            </Normaltekst>
                        </Column>
                    </Row>
                    <Row>
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-1-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-1-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                >
                                    {messages['allerede-registrert-boks-1-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-2-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-2-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                >
                                    {messages['allerede-registrert-boks-2-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row>
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-3-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-3-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                >
                                    {messages['allerede-registrert-boks-3-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default injectIntl(AlleredeRegistrert);
