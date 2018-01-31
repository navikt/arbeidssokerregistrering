import * as React from 'react';
import { rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';
import * as moment from 'moment';
import { erGyldigISODato } from './datovelger/utils';
import { guid } from '../../utils/utils';

export function paakrevdTekst(feilmeldingId: string) {
    return rules.minLength(0, <FormattedMessage id={feilmeldingId} />);
}

export function gyldigDato(value: string) {
        const date = moment(value);
        return erGyldigISODato(date) ?  undefined : <FormattedMessage key={guid()} id="datepicker-ugyldig-dato" />;
}

export function paakrevdDato(feilmeldingId: string) {
    return (value) => {
        return !!value ? undefined : <FormattedMessage key={guid()} id={feilmeldingId} />;
    };
}

export function historiskDato(value: string) {
        const date = moment(value);
        if (!value || !erGyldigISODato(date)) {
            return undefined;
        }

        return !!value && date.isSameOrBefore(moment(new Date()).endOf('day')) ?
            undefined : <FormattedMessage key={guid()} id="datepicker-historisk-dato" />;
}

interface FeedbackSummaryCreatorProps {
    header: React.ReactNode;
    errors: React.ReactNode[];
}

export function FeedbackSummaryCreator({ header, errors }: FeedbackSummaryCreatorProps) {
    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="skjema__feilomrade--harFeil"
            tabIndex={-1}
        >
            <h3>{header}</h3>
            <ul>
                {errors}
            </ul>
        </div>
    );
}