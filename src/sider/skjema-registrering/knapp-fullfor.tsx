import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { useTranslation } from 'react-i18next';

interface Props {
    disabled?: boolean;
    onClick: () => void;
}

function KnappFullfor({ disabled, onClick }: Props) {
    const { t } = useTranslation();
    return (
        <KnappBase
            type="hoved"
            className="knapp-neste"
            disabled={disabled}
            onClick={onClick}
            data-testid="neste"
        >
            <Normaltekst>{t('fullfor-knapp')}</Normaltekst>
        </KnappBase>

    );
}

export default KnappFullfor;