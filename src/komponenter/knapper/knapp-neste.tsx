import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

interface Props {
    disabled?: boolean;
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
    flag?: number;
    erAktiv: boolean;
}

function KnappNeste({disabled, onClick, className, erAktiv}: Props & InjectedIntlProps) {
    const cssclass = 'nesteknapp ' + className + (erAktiv ? 'erBesvart' : '');
    return (
        <button className={cssclass} disabled={disabled} onClick={onClick}>
            <span className="gjemt">
                <FormattedMessage id="knapp-neste"/>
            </span>
        </button>
    );
}

export default injectIntl(KnappNeste);
