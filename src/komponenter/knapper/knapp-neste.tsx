import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import * as classnames from 'classnames';

interface Props {
    disabled?: boolean;
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
    flag?: number;
    erAktiv: boolean;
}

function KnappNeste({disabled, onClick, className, erAktiv}: Props & InjectedIntlProps) {
    return (
        <button
            className={classnames('nesteknapp', className, {erAktiv})}
            disabled={disabled}
            onClick={onClick}
        >
            <span className="gjemt">
                <FormattedMessage id="knapp-neste"/>
            </span>
        </button>
    );
}

export default injectIntl(KnappNeste);
