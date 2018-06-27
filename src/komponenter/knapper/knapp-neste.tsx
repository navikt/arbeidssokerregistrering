import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
    disabled?: boolean;
    onClick: (e: React.SyntheticEvent<HTMLAnchorElement>) => void;
    className?: string;
    erAktiv: boolean;
    href: string;
}

function KnappNeste({disabled, onClick, className, erAktiv, href}: Props & InjectedIntlProps) {
    return (
        <Link
            className={classnames('nesteknapp', className, {erAktiv})}
            to={href}
            onClick={onClick}
        >
            <span className="gjemt">
                <FormattedMessage id="knapp-neste"/>
            </span>
        </Link>
    );
}

export default injectIntl(KnappNeste);
