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
import KnappNeste from '../komponenter/knapp-neste';
import { Sidetittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import PeriodeValidering from '../komponenter/input/datovelger/periodevalidering';
import Datovelger from '../komponenter/input/datovelger/datovelger';
import { formValueSelector } from 'redux-form';
import {
    dateToLocalDateString,
    isAfterDate,
    isBeforeDate,
    isoDateStringToDate,
    localDateStringToDate,
} from '../komponenter/input/datovelger/utils';
import { lagreArbeidsforhold,
    selectSisteArbeidsforhold,
    Data as ArbeidsforholdData } from '../ducks/siste-arbeidsforhold';
import { AVBRYT_PATH } from '../utils/konstanter';
import Knapperad from '../komponenter/input/knapperad';
import { Panel } from 'nav-frontend-paneler';
import EkspanderbartInfo from '../komponenter/ekspanderbartinfo/ekspanderbartInfo';

const FORM_NAME = 'sisteArbeidsforhold';

interface Props {
    handleSubmit: () => void;
    errorSummary?: React.ReactNode[];
    onSubmit: () => void;
    dispatchArbeidsforhold: (data: ArbeidsforholdData) => void;
    arbeidsgiver?: string;
    stilling?: string;
    currentFraDato?: Date;
    currentTilDato?: Date;
    history: History;
}

function SisteArbeidsforholdForm({
                                     handleSubmit,
                                     errorSummary,
                                     intl,
                                     arbeidsgiver,
                                     stilling,
                                     currentFraDato,
                                     currentTilDato,
                                     history,
                                     dispatchArbeidsforhold
                                    }: Props & InjectedIntlProps) {
    function onAvbryt() {
        dispatchArbeidsforhold({
            arbeidsgiver,
            stilling,
            fra: dateToLocalDateString(currentFraDato),
            til: dateToLocalDateString(currentTilDato)
        });
        history.push(AVBRYT_PATH);
    }

    return (
        <React.Fragment>
            <Sidetittel className="text-align-center blokk-l"><FormattedMessage id="siste-arbeidsforhold.tittel"/></Sidetittel>
            <form >
                    <Panel className="blokk-s panel-blokk padding-vertikalt-standard" >
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
                                        disabledDays={(value) => isAfterDate(currentTilDato)(value)
                                        || isAfterDate(new Date())(value)}
                                        initialMonth={currentFraDato}
                                    />
                                    <Datovelger
                                        feltNavn="tilDato"
                                        labelId="siste-arbeidsforhold.til-dato"
                                        disabledDays={(value) => isBeforeDate(currentFraDato)(value)
                                        || isAfterDate(new Date())(value)}
                                        initialMonth={currentTilDato}
                                    />
                                </div>
                            </PeriodeValidering>
                        </div>
                    </Panel>
                    <EkspanderbartInfo
                        tittelId="siste-arbeidsforhold.info.tittel"
                        className="blokk-l"
                        onClick={(e) => e.preventDefault()}
                    >
                        <FormattedMessage id="siste-arbeidsforhold.info.tekst"/>
                    </EkspanderbartInfo>
                    <Knapperad>
                        <KnappAvbryt key="1" onClick={onAvbryt} classname="mmr"/>
                        <KnappNeste key="2" onClick={handleSubmit}/>
                    </Knapperad>
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
        arbeidsgiver: selector(state, 'arbeidsgiver'),
        stilling: selector(state, 'stilling'),
        currentFraDato: isoDateStringToDate(selector(state, 'fraDato')),
        currentTilDato: isoDateStringToDate(selector(state, 'tilDato')),
        initialValues: {
            arbeidsgiver: selectSisteArbeidsforhold(state).data.arbeidsgiver,
            stilling: selectSisteArbeidsforhold(state).data.stilling,
            fraDato: localDateStringToDate(selectSisteArbeidsforhold(state).data.fra),
            tilDato: localDateStringToDate(selectSisteArbeidsforhold(state).data.til)
        }
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchArbeidsforhold: (data) => dispatch(lagreArbeidsforhold(data)),
});

// tslint:disable-next-line:no-any
export default (connect(mapStateToProps, mapDispatchToProps)(SisteArbeidsforholdReduxForm) as any);