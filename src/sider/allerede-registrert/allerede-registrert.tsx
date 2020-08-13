import * as React from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import { Normaltekst } from 'nav-frontend-typografi';
import GraaBakgrunn from '../../komponenter/graa-bakgrunn/graa-bakgrunn';
import Banner from '../../komponenter/banner/banner';
import { uniLogger } from '../../metrikker/uni-logger'
import { AppState } from '../../reducer';
import IARBSMelding from './iarbs-melding'
import { withTranslation, WithTranslation } from 'react-i18next'

import './allerede-registrert.less';
interface StateProps {
    state: AppState;
}
type Props = WithTranslation & StateProps;

class AlleredeRegistrert extends React.Component<Props> {
    handleClickAktivitetsplan(event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.aktivitetsplan', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    handleClickVeienTilArbeid(event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.veienTilArbeid', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    handleClickDialog(event) {
        const formidlingsgruppe = event.currentTarget.dataset.formidlingsgruppe;
        const servicegruppe = event.currentTarget.dataset.servicegruppe;
        const geografiskTilknytning = event.currentTarget.dataset.geografisktilknytning;
        const rettighetsgruppe = event.currentTarget.dataset.rettighetsgruppe;
        uniLogger('registrering.allerede-registrert.click.dialog', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe });
    }

    render() {
        const { t } = this.props;
        const formidlingsgruppe = this.props.state.registreringStatus.data.formidlingsgruppe;
        const servicegruppe = this.props.state.registreringStatus.data.servicegruppe;
        const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || 'INGEN_VERDI';
        const servicegruppeOrIngenVerdi = servicegruppe || 'INGEN_VERDI';
        const geografiskTilknytning = this.props.state.registreringStatus.data.geografiskTilknytning || 'INGEN_VERDI';
        const rettighetsgruppe = this.props.state.registreringStatus.data.rettighetsgruppe;
        const isIARBS = formidlingsgruppeOrIngenVerdi === 'IARBS';
        uniLogger('registrering.allerede-registrert.sidevisning', { formidlingsgruppe, servicegruppe, geografiskTilknytning, rettighetsgruppe })
        return (
            <div>
                <Banner />
                <div className="allerede-registrert">
                    <GraaBakgrunn />
                    {isIARBS ? <IARBSMelding /> : null}
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {t('allerede-registrert-boks-1-tekst')}
                                </Normaltekst>
                                <a
                                    href={t('allerede-registrert-boks-1-lenke')}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickAktivitetsplan}
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
                                >
                                    {t('allerede-registrert-boks-1-knapp')}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {t('allerede-registrert-boks-2-tekst')}
                                </Normaltekst>
                                <a
                                    href={t('allerede-registrert-boks-2-lenke')}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickVeienTilArbeid}
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
                                >
                                    {t('allerede-registrert-boks-2-knapp')}
                                </a>
                            </div>
                        </Column>
                    </Row>
                    <Row className="">
                        <Column xs="12" sm="8" className="allerede-registrert__boks">
                            <div className="allerede-registrert__boks-innhold">
                                <Normaltekst className="allerede-registrert__boks-tekst">
                                    {t('allerede-registrert-boks-3-tekst')}
                                </Normaltekst>
                                <a
                                    href={t('allerede-registrert-boks-3-lenke')}
                                    className="allerede-registrert__knapp knapp"
                                    onClick={this.handleClickDialog}
                                    data-formidlingsgruppe={formidlingsgruppeOrIngenVerdi}
                                    data-servicegruppe={servicegruppeOrIngenVerdi}
                                    data-geografisktilknytning={geografiskTilknytning}
                                    data-rettighetsgruppe={rettighetsgruppe}
                                >
                                    {t('allerede-registrert-boks-3-knapp')}
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

export default connect(mapStateToProps)(withTranslation()(AlleredeRegistrert));
