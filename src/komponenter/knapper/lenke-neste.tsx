import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';

import './lenke-neste.less';

interface Props {
    disabled?: boolean;
    onClick: (e: React.SyntheticEvent<HTMLAnchorElement>) => void;
    className?: string;
    erAktiv: boolean;
    href: string;
}

function LenkeNeste({disabled, onClick, className, erAktiv, href}: Props) {

    function animateProgressbar() {

        const framdrift = document.querySelector('.framdrift');

        if (framdrift != null) {

            framdrift.classList.add('framover');

            setTimeout(() => {
                framdrift.classList.remove('framover');
            }, 600);

        }

    }

    return (
        <div className="nestelenke__wrapper">
            <Link
                className={classnames('nestelenke knapp knapp--hoved', className, {erAktiv})}
                to={href}
                onClick={e => {
                    if (!erAktiv) {
                        e.preventDefault();
                    } else {
                        animateProgressbar();
                    }
                    onClick(e);
                }}
                data-testid="neste"
            >
                <FormattedMessage id="lenke-neste"/>
            </Link>
        </div>
    );
}

export default LenkeNeste;
