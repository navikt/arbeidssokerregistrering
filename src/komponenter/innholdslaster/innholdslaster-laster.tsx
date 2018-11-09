import * as React from 'react';
import NavFrontendSpinner, { storrelseType } from 'nav-frontend-spinner';
import './innholdslaster-laster.less';

interface LasterInterface {
    storrelse?: storrelseType;
    className?: string;
}

function Laster({ storrelse, className }: LasterInterface) {
    return (
        <div className={className}>
            <NavFrontendSpinner type={storrelse} />
        </div>
    );
}

export default Laster;
