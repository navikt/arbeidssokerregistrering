import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';

interface Props {
    disabled: boolean;
    onClick: () => void;
}

function KnappFullfor({ disabled, onClick}: Props) {
    return(
        <Knapp
            type="hoved"
            className="knapp-neste"
            disabled={disabled}
            onClick={onClick}
        >
            <Normaltekst><FormattedMessage id="knapp-fullfor"/></Normaltekst>
        </Knapp>

    );
}

export default KnappFullfor;