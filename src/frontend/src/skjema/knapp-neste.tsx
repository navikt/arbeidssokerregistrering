import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {
    disabled: boolean;
    onClick: () => void;
}

function KnappNeste({ disabled, onClick }: Props) {
    return (
        <Knapp
            type="hoved"
            className="knapp-neste"
            disabled={disabled}
            onClick={onClick}
        >
            <Normaltekst><FormattedMessage id="knapp-neste"/></Normaltekst>
        </Knapp>
    );
}

export default KnappNeste;