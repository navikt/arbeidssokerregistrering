import * as React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';
import { frontendLogger } from '../../metrikker/metrics-utils';
import {
    ActionTypes as RegistreringStatusActionTypes,
    Data as RegStatus,
    RegistreringType,
} from '../../ducks/registreringstatus';

import './allerede-registrert.less';

type Props = InjectedIntlProps & RegistreringStatusActionTypes & RegStatus;

class AlleredeRegistrert extends React.Component<Props> {
    
    handleClickAktivitetsplan () {
        frontendLogger('registrering.allerede-registrert.click.aktivitetsplan');
    }

    handleClickVeienTilArbeid () {
        frontendLogger('registrering.allerede-registrert.click.veienTilArbeid');
    }

    handleClickDialog () {
        frontendLogger('registrering.allerede-registrert.click.dialog');
    }

    handleClickDagpenger (event) {
        const isOpen = event.currentTarget.getAttribute('aria-expanded') === 'false';
        if (isOpen) {
            frontendLogger('registrering.allerede-registrert.click.dagpenger');   
        }
    }

    render() {
        const messages = this.props.intl.messages;
        const { formidlingsgruppe } = this.props as RegStatus;
        const formidlingsgruppeOrFalse = formidlingsgruppe || false;
        return (
            <div>
                <Banner />
                <div className="allerede-registrert">
                    <GraaBakgrunn />
                    <Row className="">
                        <Column xs="12">
                            <Innholdstittel tag="h1" className="allerede-registrert__tittel">
                                {messages['allerede-registrert-tittel']}
                            </Innholdstittel>
                            <Normaltekst className="allerede-registrert__undertittel">
                                {messages['allerede-registrert-undertittel']}
                            </Normaltekst>
                        </Column>
                    </Row>
                    <Row className={formidlingsgruppeOrFalse === 'IARBS' ? '' : 'hidden'}>
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <Ekspanderbartpanel
                                tittel={messages['allerede-registrert-panel-dagpenger-tittel']}
                                onClick={this.handleClickDagpenger}
                                border>
                                {messages['allerede-registrert-panel-dagpenger-tekst']}
                            </Ekspanderbartpanel>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-1-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-1-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickAktivitetsplan}
                                >
                                    {messages['allerede-registrert-boks-1-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-2-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-2-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickVeienTilArbeid}
                                >
                                    {messages['allerede-registrert-boks-2-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {messages['allerede-registrert-boks-3-tekst']}
                                </Normaltekst>
                                <a
                                    href={messages['allerede-registrert-boks-3-lenke']}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickDialog}
                                >
                                    {messages['allerede-registrert-boks-3-knapp']}
                                </a>
                            </div>
                        </Column>
                    </Row>
                </div>
            </div>
        );
    }
}

export default injectIntl(AlleredeRegistrert);
