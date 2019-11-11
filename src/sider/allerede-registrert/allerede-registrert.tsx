import * as React from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';
import { frontendLogger } from '../../metrikker/metrics-utils';
import { AppState } from '../../reducer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Fieldset, Radio } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import hash from '../../utils/hash'

import './allerede-registrert.less';
interface StateProps {
    state: AppState;
}
type Props = InjectedIntlProps & StateProps;

class AlleredeRegistrert extends React.Component<Props> {
    handleClickAktivitetsplan (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.aktivitetsplan', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    handleClickVeienTilArbeid (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.veienTilArbeid', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    handleClickDialog (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        frontendLogger('registrering.allerede-registrert.click.dialog', { formidlingsgruppeTag: formidlingsgruppe, servicegruppeTag: servicegruppe}, {});
    }

    handleClickKontaktMeg (event) {
        const kvittering = document.getElementById('kontaktMegKvittering')
        const melding = document.getElementById('kontaktMegMeldingWrapper')
        if (melding && kvittering) {
            melding.className = 'hidden'
            kvittering.className = 'blokk-s'
        }
    }

    handleClickContact (event) {
        const melding = document.getElementById('kontaktMegMelding')
        const knapp = document.getElementById('kontaktMegKnapp')
        if (melding && knapp && event.target.id === 'kontaktMegAnnet') {
            melding.className = 'blokk-s'
            knapp.className = 'hidden'
        }
        if (melding && knapp && event.target.id === 'kontaktMegDagpenger') {
            melding.className = 'hidden'
            knapp.className = 'knapp'
        }
    }
    render() {
        const messages = this.props.intl.messages;
        const formidlingsgruppe = this.props.state.registreringStatus.data.formidlingsgruppe;
        const servicegruppe = this.props.state.registreringStatus.data.servicegruppe;
        const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || 'INGEN_VERDI';
        const servicegruppeOrIngenVerdi = servicegruppe || 'INGEN_VERDI';
        const geografiskTilknytning = this.props.state.registreringStatus.data.geografiskTilknytning || 'INGEN_VERDI';
        const isIARBS = formidlingsgruppeOrIngenVerdi === 'IARBS';
        const newPlaster = isIARBS && geografiskTilknytning === '030102';
        const hashedNavn = hash(this.props.state.brukersNavn.data.sammensattNavn)
        frontendLogger('registrering.allerede-registrert.visning', { brukernavn : hashedNavn }, { formidlingsgruppeTag: formidlingsgruppeOrIngenVerdi, servicegruppeTag: servicegruppeOrIngenVerdi, geografiskTilknytningTag: geografiskTilknytning })
        return (
            <div>
                <Banner />
                <div className="allerede-registrert">
                    <GraaBakgrunn />
                    {isIARBS || newPlaster ? null :
                        <Row className="">
                        <Column xs="12">
                            <Innholdstittel tag="h1" className="allerede-registrert__tittel">
                                {messages['allerede-registrert-tittel']}
                            </Innholdstittel>
                            <Normaltekst className="allerede-registrert__undertittel">
                                {messages['allerede-registrert-undertittel']}
                            </Normaltekst>
                        </Column>
                    </Row>}
                    {isIARBS && !newPlaster ? <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <AlertStripeAdvarsel>
                                <Normaltekst className="blokk-s">Vi ser at du ønsker å registrere deg som arbeidssøker.</Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Hvis du prøver å registrere deg fordi du ønsker å søke dagpenger, må du ta kontakt med NAV.</strong></Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Ring <a href="tel:+4755553333">55 55 33 33</a></strong> med tastevalg 2.</Normaltekst>
                                <Normaltekst>Hvis du ikke har behov for å søke om dagpenger kan du se bort fra denne meldingen.</Normaltekst>
                            </AlertStripeAdvarsel>
                        </Column>
                    </Row> : null}
                    {newPlaster ? <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="blokk-s">Vi ser at du prøver å registrere deg som arbeidssøker.</Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Hvis du prøver å registrere deg fordi du ønsker å søke dagpenger, må du ta kontakt med NAV.</strong></Normaltekst>
                                <div className="blokk-s" id="kontaktMegMeldingWrapper">
                                    <Fieldset legend="">
                                        <Radio label={'Ja, jeg skal søke dagpenger og vil bli kontaktet av en veileder'} name="kontaktmeg" id="kontaktMegDagpenger" onChange={this.handleClickContact} />
                                        <Radio label={'Jeg ønsker å snakke med en veileder uavhengig av dagpenger'} id="kontaktMegAnnet" onChange={this.handleClickContact} name="kontaktmeg" />
                                    </Fieldset>
                                    <Normaltekst className="hidden" id="kontaktMegMelding">
                                        Hvis du ønsker å snakke om noe annet enn dagpenger, må du ringe 55 55 33 33.
                                    </Normaltekst>
                                    <Knapp className="hidden" id="kontaktMegKnapp" onClick={this.handleClickKontaktMeg}>Send inn henvendelsen</Knapp>
                                </div>
                                <div className="hidden" id="kontaktMegKvittering">
                                    <Normaltekst>Din henvendelse er mottatt</Normaltekst>
                                    <Normaltekst>Forventet svartid på denne henvendelsen er 2 arbeidsdager.</Normaltekst>
                                </div>
                            </div>
                        </Column>
                    </Row> : null}
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
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
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
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
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
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
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

const mapStateToProps = (state: AppState) => ({
    state: state,
});

export default connect(mapStateToProps)(injectIntl(AlleredeRegistrert));
