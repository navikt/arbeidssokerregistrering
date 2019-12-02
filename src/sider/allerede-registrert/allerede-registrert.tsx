import * as React from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst, Innholdstittel } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';
import { uniLogger } from '../../metrikker/uni-logger'
import { AppState } from '../../reducer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import IARBSPlaster from './iarbs-plaster'

import './allerede-registrert.less';
interface StateProps {
    state: AppState;
}
type Props = InjectedIntlProps & StateProps;

class AlleredeRegistrert extends React.Component<Props> {
    handleClickAktivitetsplan (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.aktivitetsplan', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    handleClickVeienTilArbeid (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.veienTilArbeid', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    handleClickDialog (event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.dialog', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    render() {
        const messages = this.props.intl.messages;
        const formidlingsgruppe = this.props.state.registreringStatus.data.formidlingsgruppe;
        const servicegruppe = this.props.state.registreringStatus.data.servicegruppe;
        const featureToggles = this.props.state.featureToggles.data;
        const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || 'INGEN_VERDI';
        const servicegruppeOrIngenVerdi = servicegruppe || 'INGEN_VERDI';
        const geografiskTilknytning = this.props.state.registreringStatus.data.geografiskTilknytning || 'INGEN_VERDI';
        const rettighetsgruppe = this.props.state.registreringStatus.data.rettighetsgruppe;
        const isIARBS = formidlingsgruppeOrIngenVerdi === 'IARBS';
        const kontorToggle = `arbeidssokerregistrering.kontaktmeg.kontor-${geografiskTilknytning}`;
        const nyttPlaster = isIARBS && featureToggles[kontorToggle];
        const gammeltPlaster = isIARBS && !featureToggles[kontorToggle];
        uniLogger('registrering.allerede-registrert.sidevisning', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe })
        return (
            <div>
                <Banner />
                <div className="allerede-registrert">
                    <GraaBakgrunn />
                    {gammeltPlaster || nyttPlaster ? null :
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
                    {gammeltPlaster ? <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold venstrejustert">
                                <AlertStripeAdvarsel className="blokk-s">
                                    <Normaltekst>Vi får ikke registrert deg som arbeidssøker.</Normaltekst>
                                </AlertStripeAdvarsel>
                                <Normaltekst className="blokk-s"><strong>Hvis du har søkt eller ønsker å søke dagpenger, må du ta kontakt med NAV.</strong></Normaltekst>
                                <Normaltekst className="blokk-s"><strong>Ring <a href="tel:+4755553333">55 55 33 33</a>, tastevalg 2.</strong></Normaltekst>
                                <Normaltekst>Hvis det ikke er aktuelt å søke dagpenger nå, eller du har arbeidsavklaringspenger kan du se bort fra denne meldingen.</Normaltekst>
                            </div>
                        </Column>
                    </Row> : null}
                    {nyttPlaster ? <IARBSPlaster /> : null}
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
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
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
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
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
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
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
