import * as React from 'react';
import { rules } from 'react-redux-form-validation';
import { FormattedMessage } from 'react-intl';

export function paakrevdTekst(feilmeldingId: string) {
    return rules.minLength(0, <FormattedMessage id={feilmeldingId} />);
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