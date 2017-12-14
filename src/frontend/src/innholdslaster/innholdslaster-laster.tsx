import * as React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';

function Laster({ storrelse }: any) {
    return (
        <div className="innholdslaster">
            <NavFrontendSpinner storrelse={storrelse} />
        </div>
    );
}

export default Laster;
