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

function LenkeNeste({disabled, onClick, className, erAktiv, href}: Props & InjectedIntlProps) {
    return (
        <Link
            className={classnames('nestelenke', className, {erAktiv})}
            to={href}
            onClick={e => {
                if (!erAktiv) {
                    e.preventDefault();
                }
                onClick(e);
            }}
        >
            <span className="gjemt">
                <FormattedMessage id="lenke-neste"/>
            </span>
        </Link>
    );
}

export default injectIntl(LenkeNeste);
