import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import Input from '../komponenter/skjema/input';
import { validForm } from 'react-redux-form-validation';
import { FeedbackSummaryCreator, paakrevdTekst } from '../komponenter/skjema/validering';
import { getIntlMessage } from '../utils/utils';
import KnappAvbryt from '../skjema/knapp-avbryt';
import PanelBlokkGruppe from '../felles/panel-blokk-gruppe';
import KnappNeste from '../komponenter/knapp-neste';
import PanelBlokk from '../felles/panel-blokk';
import { Sidetittel } from 'nav-frontend-typografi';

interface Props {
    handleSubmit: () => void;
    errorSummary?: React.ReactNode[];
    onAvbryt: () => void;
}

function SisteArbeidsforholdForm({handleSubmit, onAvbryt, errorSummary, intl}: Props & InjectedIntlProps) {
    return (
        <React.Fragment>
            <Sidetittel className="center blokk-l"><FormattedMessage id="siste-arbeidsforhold.tittel"/></Sidetittel>
            <form >
                <PanelBlokkGruppe
                    knappAksjoner={[
                        <KnappAvbryt key="1" onClick={onAvbryt} classname="mmr"/>,
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
                        </div>
                    </PanelBlokk>
                </PanelBlokkGruppe>
            </form>
        </React.Fragment>
    );
}

const SisteArbeidsforholdReduxForm = validForm({
    form: 'siste-arbeidsforhold',
    listCreator: FeedbackSummaryCreator,
    errorSummaryTitle: (<FormattedMessage id="siste-arbeidsgiver.feiloppsummering-tittel"/>),
    validate: {
        arbeidsgiver: [paakrevdTekst('siste-arbeidsgiver.feil.arbeidsgiver')],
        stilling: [paakrevdTekst('siste-arbeidsgiver.feil.stilling')]
    }
})(injectIntl(SisteArbeidsforholdForm));

export default SisteArbeidsforholdReduxForm;