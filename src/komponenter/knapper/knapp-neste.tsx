import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as classNames from 'classnames';
import KnappBase from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { getIntlMessage } from '../../utils/utils';

interface Props {
    disabled?: boolean;
    onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
    flag?: number;
}

function KnappNeste({ disabled, onClick, className, intl }: Props & InjectedIntlProps) {
    const clsnames = (clName: string | undefined) => classNames(clName);
    console.log('heihei...'); // tslint:disable-line

    return (
        <KnappBase
            type="hoved"
            className={clsnames(className)}
            disabled={disabled}
            onClick={onClick}
        >
            <Normaltekst>{getIntlMessage(intl.messages, 'knapp-neste')}</Normaltekst>
        </KnappBase>
    );
}

export default injectIntl(KnappNeste);
