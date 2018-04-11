import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {
    onClick: () => void;
    classname?: string;
}

function KnappAvbryt({ classname, onClick }: Props) {
    return (
        <Knapp
            type="standard"
            className={classname}
            onClick={onClick}
        >
            <Normaltekst><FormattedMessage id="knapp-avbryt"/></Normaltekst>
        </Knapp>
    );
}

export default KnappAvbryt;