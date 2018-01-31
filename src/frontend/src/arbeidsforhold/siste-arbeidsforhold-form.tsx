import * as React from 'react';
import { History } from 'history';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import Input from '../komponenter/input/input';
import { validForm } from 'react-redux-form-validation';
import {
    FeedbackSummaryCreator, gyldigDato, historiskDato, paakrevdDato,
    paakrevdTekst
} from '../komponenter/input/validering';
import { getIntlMessage } from '../utils/utils';
import KnappAvbryt from '../skjema/knapp-avbryt';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import KnappNeste from '../komponenter/knapp-neste';
import PanelBlokk from '../felles/panel-blokk';
import { Sidetittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import PeriodeValidering from '../komponenter/input/datovelger/periodevalidering';
import Datovelger from '../komponenter/input/datovelger/datovelger';
import { formValueSelector } from 'redux-form';
import { AVBRYT_PATH } from '../utils/konstanter';
import { isAfterDate, isBeforeDate, toDateOrUndefined } from '../komponenter/input/datovelger/utils';

const FORM_NAME = 'sisteArbeidsforhold';

interface Props {
    handleSubmit: () => void;
    errorSummary?: React.ReactNode[];
    onSubmit: () => void;
    currentFraDato: Date;
    currentTilDato: Date;
    history: History;
}

function SisteArbeidsforholdForm({
                                     handleSubmit,
                                     errorSummary,
                                     intl,
                                     currentFraDato,
                                     currentTilDato,
                                     history
                                    }: Props & InjectedIntlProps) {
    return (
        <React.Fragment>
            <Sidetittel className="center blokk-l"><FormattedMessage id="siste-arbeidsforhold.tittel"/></Sidetittel>
            <form >
                <PanelBlokkGruppe
                    knappAksjoner={[
                        <KnappAvbryt key="1" onClick={() => history.push(AVBRYT_PATH)} classname="mmr"/>,
                        <KnappNeste key="2" onClick={handleSubmit}/>
                    ]}
                >
                    <PanelBlokk >
                        <div>
                            {errorSummary}
                            <Input
                                feltNavn="arbeidsgiver"
                                label={getIntlMessage(intl.messages, 'siste-arbeidsforhold.arbeidsgiver')}
                            />
                            <Input
                                feltNavn="stilling"
                                label={getIntlMessage(intl.messages, 'siste-arbeidsforhold.stilling')}
                            />
                            <PeriodeValidering
                                feltNavn="periodeValidering"
                                fraDato={currentFraDato}
                                tilDato={currentTilDato}
                                errorMessageId="datepicker.feilmelding.egen.fradato-etter-frist"
                            >
                                <div className="dato-container">
                                    <Datovelger
                                        feltNavn="fraDato"
                                        labelId="siste-arbeidsforhold.fra-dato"
                                        disabledDays={isAfterDate(currentTilDato)}
                                        initialMonth={toDateOrUndefined(currentFraDato)}
                                    />
                                    <Datovelger
                                        feltNavn="tilDato"
                                        labelId="siste-arbeidsforhold.til-dato"
                                        disabledDays={isBeforeDate(currentFraDato)}
                                        initialMonth={toDateOrUndefined(currentTilDato)}
                                    />
                                </div>
                            </PeriodeValidering>
                        </div>
                    </PanelBlokk>
                </PanelBlokkGruppe>
            </form>
        </React.Fragment>
    );
}

const SisteArbeidsforholdReduxForm = validForm({
    form: FORM_NAME,
    listCreator: FeedbackSummaryCreator,
    errorSummaryTitle: (<FormattedMessage id="siste-arbeidsgiver.feiloppsummering-tittel"/>),
    validate: {
        arbeidsgiver: [paakrevdTekst('siste-arbeidsgiver.feil.arbeidsgiver')],
        stilling: [paakrevdTekst('siste-arbeidsgiver.feil.stilling')],
        periodeValidering: [],
        fraDato: [gyldigDato, paakrevdDato('siste-arbeidsgiver.feil.dato'), historiskDato],
        tilDato: [gyldigDato, historiskDato]
    }
})(injectIntl(SisteArbeidsforholdForm));

const mapStateToProps = (state) => {
    const selector = formValueSelector(FORM_NAME);
    return {
        currentFraDato: selector(state, 'fraDato'),
        currentTilDato: selector(state, 'tilDato'),
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSubmit: props => {
        // tslint:disable-next-line:no-console
        console.log('props', props); // Logger til console frem til vi vet hva som skal gjøres
    }
});

// tslint:disable-next-line:no-any
export default (connect(mapStateToProps, mapDispatchToProps)(SisteArbeidsforholdReduxForm) as any);