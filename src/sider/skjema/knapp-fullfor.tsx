import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { getIntlMessage } from '../../utils/utils';
import InjectedIntl = ReactIntl.InjectedIntl;

interface Props {
    disabled?: boolean;
    onClick: () => void;
    intl: InjectedIntl;
}

function KnappFullfor({ disabled, onClick, intl}: Props) {
    return(
        <KnappBase
            type="hoved"
            className="knapp-neste"
            disabled={disabled}
            onClick={onClick}
        >
            <Normaltekst>{getIntlMessage(intl.messages, 'knapp-fullfor')}</Normaltekst>
        </KnappBase>

    );
}

export default KnappFullfor;