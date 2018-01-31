import * as React from 'react';
import * as classNames from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {
    disabled?: boolean;
    onClick: () => void;
    className?: string;
}

function KnappNeste({ disabled, onClick, className }: Props) {
    const clsnames = (clName: string | undefined) => classNames(clName);
    return (
        <Knapp
            type="hoved"
            className={clsnames(className)}
            disabled={disabled}
            onClick={onClick}
        >
            <Normaltekst><FormattedMessage id="knapp-neste"/></Normaltekst>

        </Knapp>
    );
}

export default KnappNeste;